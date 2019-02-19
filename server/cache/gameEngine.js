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
  assignRoad(road, player) {
    this.board.roads[road].player = player;
  }

  getBoard() {
    return this.board;
  }
}

module.exports = GameEngine;
