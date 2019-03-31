const { Player } = require('../db');

class GameEngine {
  constructor(board, gameState) {
    this.board = JSON.parse(board);
    this.players = {};
    this.gameState = JSON.parse(gameState);
    this.sockets = {};
    this.messages = [];
    this.trades = {};
  }
  addSocket(socket, player) {
    this.sockets = { ...this.sockets, [player]: socket };
  }

  addPlayer(player) {
    const { playerNumber, state } = player;
    if (!this.players[playerNumber]) {
      this.players[playerNumber] = JSON.parse(state);
      this.gameState.players[playerNumber] = this.parsePlayer(
        this.players[playerNumber]
      );
      console.log('adding player:', this.gameState.players);
    }
  }

  send(key, fn) {
    fn({ [key]: this[key] });
  }

  parsePlayer(player) {
    return {
      resources: Object.keys(player.resources).reduce(
        (a, v) => a + player.resources[v],
        0
      ),
      devCards: Object.keys(player.devCards).reduce(
        (a, v) => a + player.devCards[v],
        0
      ),
      largestArmy: player.largestArmy,
      longestRoad: player.longestRoad,
      victoryPoints: player.victoryPoints,
    };
  }

  updateAllPlayers(game) {
    console.log(game, this.players);
    Object.keys(this.players).forEach(player => {
      this.gameState.players[player] = this.parsePlayer(this.players[player]);
      Player.update(
        { state: JSON.stringify(this.players[player]) },
        { where: { playerNumber: player, gameName: game } }
      );
    });
  }

  getGameState(playerNumber) {
    const { players, board, gameState } = this;
    return {
      player: players[playerNumber],
      board,
      gameState: { ...gameState, devCards: gameState.devCards.length },
    };
  }

  exchangeResources(player) {
    const { playerTurn } = this.gameState;
    const resources = this.trades[player];
    Object.keys(resources).forEach(type => {
      this.players[playerTurn].resources[type] += resources[type];
      this.players[player].resources[type] -= resources[type];
    });
  }

  handleTrade({ resources, player, action }) {
    switch (action) {
      case 'add':
        this.trades[player] = resources;
        return { type: null, payload: this.trades };
      case 'reject':
        delete this.trades[player];
        return { type: null, payload: this.trades };
      case 'accept':
        return this.exchangeResources(player);
      default:
        return this.trades;
    }
  }

  handleMessages(message) {
    this.messages.push(message);
    return { type: null, payload: this.messages };
  }

  update(update) {
    switch (update.type) {
      case 'road':
        return this.assignRoad(update);
      case 'settlement':
        return this.assignSettlement(update);
      case 'diceValue':
        return this.updateDice(update);
      case 'player':
        return this.players[update.playerNumber];
      case 'message':
        return this.handleMessages(update);
      case 'trade':
        return this.handleTrade(update);
      default:
    }
  }

  assignRoad({ id, playerNumber }) {
    this.board.roads[id].player = playerNumber;
    return { type: 'board', payload: this.board };
  }

  assignSettlement({ id, playerNumber }) {
    this.board.settlements[id].player = playerNumber;
    this.board.settlements[id].build += 1;
    return { type: 'board', payload: this.board };
  }

  updateDice({ diceValue, game }) {
    this.gameState.diceValue = diceValue;
    this.distributeResources(diceValue);
    this.updateAllPlayers(game);
    return { type: 'game', payload: this.gameState };
  }

  distributeResources(diceValue) {
    const { resources, settlements } = this.board;
    Object.keys(resources).forEach(id => {
      const resource = resources[id];
      if (resource.diceValue == diceValue) {
        resource.settlements.forEach(settlementId => {
          const { build, player } = settlements[settlementId];
          if (build) {
            this.players[player].resources[resource.type] += build;
          }
        });
      }
    });
  }
}

module.exports = GameEngine;
