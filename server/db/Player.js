const Sequelize = require('sequelize');
const db = require('./database');
const state = require('../player');

const Player = db.define('players', {
  playerNumber: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  state: {
    type: Sequelize.TEXT,
  },
});

Player.beforeCreate(player => {
  console.log('running before create');
  if (!player.state) {
    player.state = JSON.stringify(state(player.playerNumber));
  }
});

module.exports = Player;
