const express = require('express');
const router = express.Router();
const { Game } = require('../../db');
const cache = require('../../cache/gameCache');

router.get('/', (req, res, next) => {
  res.send('hit the game get route');
});

router.post('/', async (req, res, next) => {
  const name = req.body.name;

  try {
    const { player, game } = await Game.joinGame(name, req.user);
    cache.addGame(game);
    cache.joinGame(player, game);
    const cachedGame = cache.getGame(name, player.playerNumber);
    res.json(cachedGame);
  } catch (err) {
    console.log(err);
    res.sendStatus(401);
  }
});

module.exports = router;
