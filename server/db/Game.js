const Sequelize = require('sequelize');
const db = require('./database');
const board = require('../board');
// const testBoard = require('../testBoard');
const game = require('../game');

const Game = db.define('games', {
  name: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  players: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  gameState: {
    type: Sequelize.TEXT,
  },
  board: {
    type: Sequelize.TEXT,
    defaultValue: JSON.stringify(board()),
  },
});

Game.beforeCreate(newGame => {
  newGame.gameState = JSON.stringify(game(newGame.name));
});

module.exports = Game;
