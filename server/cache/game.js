const Board = require('./board');
const Player = require('./player');

class Game {
  constructor(board) {
    this.board = new Board(board);
    this.players = {};
  }
  addPlayer(player) {
    const { playerNumber, state } = player;
    if (!this.players[playerNumber]) {
      this.players[playerNumber] = new Player(state);
      console.log('adding player:', this.players);
    }
  }
  getGameState(game, playerNumber) {
    const player = this.players[playerNumber].getState();
    const board = this.board.getBoard();
    return { game, player, board };
  }
}

module.exports = Game;
