const GameEngine = require('./gameEngine');

class GameCache {
  constructor() {
    this.games = {};
    this.sockets = {};
  }

  addGame(game) {
    if (!this.games[game.name]) {
      this.games[game.name] = new GameEngine(game.board, game.gameState);
      console.log('game added:', Object.keys(this.games));
    }
  }

  joinGame(player, { name }) {
    const game = this.getGame(name);
    if (game) game.addPlayer(player);
  }

  cacheSocket(socketId, game) {
    this.sockets[socketId] = game;
  }

  removeSocket(socketId) {
    const game = this.getGame(this.sockets[socketId]);
    delete this.sockets[socketId];
    return game;
  }

  getGame(name) {
    return this.games[name];
  }
}

module.exports = new GameCache();
