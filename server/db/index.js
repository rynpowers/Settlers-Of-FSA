const User = require('./User');
const Game = require('./Game');
const Player = require('./Player');
const db = require('./database');

User.belongsToMany(Game, { through: Player });
Game.belongsToMany(User, { through: Player });

Game.joinGame = async (name, user) => {
  const [game] = await Game.findOrCreate({ where: { name } });
  let player = await Player.findOne({
    where: { gameName: name, userId: user.id },
  });

  if (player) return { player, game };
  else if (game.players < 4) return Game.addPlayer(game, user);
  else throw new Error('unable to join game');
};

Game.addPlayer = async (game, user) => {
  console.log('creating player');
  const player = await Player.create({
    gameName: game.name,
    userId: user.id,
    playerNumber: game.players + 1,
  });
  game.players++;
  await game.save();
  return { player, game };
};

module.exports = {
  User,
  Game,
  db,
  Player,
};
