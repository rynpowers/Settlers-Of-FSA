const { Player } = require('../db');

class GameEngine {
  constructor(board, gameState) {
    this.board = JSON.parse(board);
    this.players = {};
    this.gameState = JSON.parse(gameState);
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

  parsePlayer(player) {
    return {
      resources: Object.keys(player.resources).reduce(
        (a, v) => a + player.resources[v],
        0
      ),
      largestArmy: player.largestArmy,
      longestRoad: player.longestRoad,
      victoryPoints: player.victoryPoints,
    };
  }

  updateAllPlayers(game) {
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