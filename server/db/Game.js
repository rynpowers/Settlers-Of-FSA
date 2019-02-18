const Sequelize = require('sequelize');
const db = require('./database');
const board = require('../board');

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
  board: {
    type: Sequelize.TEXT,
    defaultValue: JSON.stringify(board()),
  },
});

module.exports = Game;
