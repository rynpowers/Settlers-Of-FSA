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

  update({ type, playerNumber, game, id }) {
    const curGame = this.games[game];
    const board = curGame.update({ type, playerNumber, game, id });
    Game.update({ board: JSON.stringify(board) }, { where: { name: game } });
    return board;
  }
}

module.exports = new GameCache();
