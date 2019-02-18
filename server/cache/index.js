const Game = require('./game');

class GameCache {
  constructor() {
    this.games = {};
  }
  addGame(game) {
    if (!this.games[game.name]) {
      this.games[game.name] = new Game(game.board);
      console.log('game added:', this.games[game.name]);
    }
  }
  joinGame(player, { name }) {
    const game = this.games[name];
    if (game) game.addPlayer(player);
  }
  getGame(name, playerNumber) {
    const game = this.games[name];
    if (game) {
      return game.getGameState(name, playerNumber);
    }
  }
}

module.exports = new GameCache();
