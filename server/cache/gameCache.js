const GameEngine = require('./gameEngine');
const { Game } = require('../db');

class GameCache {
  constructor() {
    this.games = {};
  }

  addGame(game) {
    if (!this.games[game.name]) {
      this.games[game.name] = new GameEngine(game.board, game.gameState);
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
      return game.getGameState(playerNumber);
    }
  }

  updateGame(update) {
    const curGame = this.games[update.game];
    const newUpdate = curGame.update(update);
    if (newUpdate.type) {
      Game.update(
        { [newUpdate.type]: JSON.stringify(newUpdate.payload) },
        { where: { name: update.game } }
      );
    }
    return newUpdate.payload;
  }

  updatePlayer(game, playerNumber) {
    const curGame = this.games[game];
    const update = curGame.update({ type: 'player', playerNumber });
    return update;
  }
}

module.exports = new GameCache();
