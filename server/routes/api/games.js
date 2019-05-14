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
    const curGame = cache.getGame(name);
    const payload = curGame.payload();
    res.json({
      player: payload.players[player.playerNumber],
      gameState: payload.game,
      board: payload.board,
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(401);
  }
});

module.exports = router;
