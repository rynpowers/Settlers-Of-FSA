const GameEngine = require('./gameEngine');

class GameCache {
  constructor() {
    this.games = {};
  }

  addGame(game) {
    if (!this.games[game.name]) {
      this.games[game.name] = new GameEngine(game.board);
      console.log('game added:', Object.keys(this.games));
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

  updateRoad(road, player, game) {
    const curGame = this.games[game];
    curGame.assignRoad(road, player);
    return curGame.getBoard();
  }
}

module.exports = new GameCache();
