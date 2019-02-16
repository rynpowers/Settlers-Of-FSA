const { Game } = require('./db');

class Board {
  constructor(board) {
    this.board = JSON.parse(board);
  }
  getBoard() {
    return this.board;
  }
}

class GameCenter {
  constructor() {
    this.games = {};
  }
  async sendGame(io, socket, name) {
    if (!this.games[name]) {
      console.log('createing new board');
      console.log('current games:', Object.keys(this.games));
      const [game] = await Game.findOrCreate({ where: { name } });
      this.games[game.name] = new Board(game.board);
    }
    io.to(socket.id).emit('dispatch', {
      type: 'SET_BOARD',
      board: this.games[name].getBoard(),
    });
  }
}

module.exports = GameCenter;
