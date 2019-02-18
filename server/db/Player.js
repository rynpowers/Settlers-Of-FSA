const Sequelize = require('sequelize');
const db = require('./database');
const state = require('../player');

const Player = db.define('players', {
  playerNumber: {
    type: Sequelize.INTEGER,
  },
  state: {
    type: Sequelize.TEXT,
    defaultValue: state,
  },
});

module.exports = Player;
