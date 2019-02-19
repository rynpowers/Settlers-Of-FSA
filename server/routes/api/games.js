const express = require('express');
const router = express.Router();
const { Game } = require('../../db');
const gameCache = require('../../cache');

router.get('/', (req, res, next) => {
  res.send('hit the game get route');
});

router.post('/', async (req, res, next) => {
  const name = req.body.name;

  try {
    const { player, game } = await Game.joinGame(name, req.user);
    gameCache.addGame(game);
    gameCache.joinGame(player, game);
    res.json(gameCache.getGame(name, player.playerNumber));
  } catch (err) {
    console.log(err);
    res.sendStatus(401);
  }
});

module.exports = router;
