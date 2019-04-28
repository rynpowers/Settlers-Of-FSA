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

  updatePlayers(...args) {
    args.forEach(player => {
      this.gameState.players[player] = this.parsePlayer(this.players[player]);
      Player.update(
        { state: JSON.stringify(this.players[player]) },
        { where: { playerNumber: player, gameName: this.gameState.name } }
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
    this.gameState.mode = '';
    this.updatePlayers(playerTurn, player);
    this.trades = {};
    return { payload: { game: this.gameState, accepted: true } };
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

  handleGameState({ payload }) {
    Object.keys(payload).forEach(key => {
      this.gameState[key] = payload[key];
    });
    return { payload: this.gameState };
  }

  handleRobber(update) {
    this.gameState.responded[update.playerNumber] = true;
    const complete = this.gameState.responded.every(player => player);

    if (complete) {
      this.gameState.mode = 'acknowledgeMoveRobber';
      this.gameState.flash = `Player-${
        this.gameState.playerTurn
      } please move the robber`;
      this.gameState.responded = [true, false, false, false, false];
    }

    return { payload: { game: this.gameState } };
  }

  handleFlash(update) {
    this.gameState.flash = '';
    this.gameState.mode = update.mode;
    return { payload: { game: this.gameState } };
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
      case 'game':
        return this.handleGameState(update);
      case 'robber':
        return this.handleRobber(update);
      case 'flash':
        return this.handleFlash(update);
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

  updateDice({ diceValue }) {
    this.gameState.diceValue = diceValue;
    this.gameState.mode = 'roll';
    if (this.gameState.diceValue == 7) {
      this.gameState.mode = 'robber';
      this.gameState.responded = this.gameState.responded.map((bool, i) => {
        return !i || (i && this.gameState.players[i].resources < 8);
      });
      return { type: 'game', payload: this.gameState };
    }
    this.updatePlayers(...this.distributeResources(diceValue));
    return { type: 'game', payload: this.gameState };
  }

  distributeResources(diceValue) {
    const { resources, settlements } = this.board;
    const updatedPlayers = {};
    Object.keys(resources).forEach(id => {
      const resource = resources[id];
      if (resource.diceValue == diceValue) {
        resource.settlements.forEach(settlementId => {
          const { build, player } = settlements[settlementId];
          if (build) {
            updatedPlayers[player] = true;
            this.players[player].resources[resource.type] += build;
          }
        });
      }
    });
    return Object.keys(updatedPlayers);
  }
}

module.exports = GameEngine;
