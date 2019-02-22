const { Game } = require('../db');

class GameEngine {
  constructor(board) {
    this.board = JSON.parse(board);
    this.players = {};
  }
  addPlayer(player) {
    const { playerNumber, state } = player;
    if (!this.players[playerNumber]) {
      this.players[playerNumber] = JSON.parse(state);
      console.log('adding player:', this.players);
    }
  }
  getGameState(game, playerNumber) {
    const player = this.players[playerNumber];
    const board = this.board;
    return { game, player, board };
  }

  update({ type, playerNumber, id }) {
    switch (type) {
      case 'road':
        return this.assignRoad(id, playerNumber);
      case 'settlement':
        return this.assignSettlement(id, playerNumber);
      default:
    }
  }

  assignRoad(id, player) {
    this.board.roads[id].player = player;
    return this.board;
  }

  assignSettlement(id, player) {
    this.board.settlements[id].player = player;
    this.board.settlements[id].build += 1;
    return this.board;
  }
}

module.exports = GameEngine;
