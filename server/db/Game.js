const Sequelize = require('sequelize');
const db = require('./database');
const board = require('../board');

const Game = db.define('games', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  board: {
    type: Sequelize.TEXT,
    defaultValue: board,
  },
});

module.exports = Game;
