const chalk = require('chalk');
const cache = require('./cache/gameCache');

module.exports = io => {
  io.on('connection', socket => {
    console.log(chalk.blue(`${socket.id} is connected`));

    socket.on('join-game', (room, player) => {
      socket.join(room);
      cache.cacheSocket(socket.id, room);
      const curGame = cache.getGame(room);
      const { players } = curGame.addSocket(socket.id, player);

      if (Object.keys(players).length < 4) {
        socket.broadcast
          .to(room)
          .emit('dispatch', { type: 'JOIN_GAME', players });
      } else if (!curGame.playing()) {
        const game = curGame.start();
        io.to(room).emit('dispatch', { type: 'SET_GAME', game });
      }

      console.log(
        chalk.yellow(
          `${socket.id} is joining room:`,
          room,
          `as player-${player}`,
          Object.keys(cache.games)
        )
      );
    });

    // BUILDING

    socket.on('update', payload => {
      const curGame = cache.getGame(payload.game);
      const { sockets, game, board, players } = curGame.update(payload);

      Object.keys(sockets).forEach(player =>
        io.to(sockets[player]).emit('dispatch', {
          type: 'UPDATE_GAME',
          game,
          board,
          player: players[player],
        })
      );
    });

    // CHAT

    socket.on('message', payload => {
      console.log(payload);
      const curGame = cache.getGame(payload.game);
      const { messages } = curGame.update(payload);
      socket.broadcast.to(payload.game).emit('messages', { messages });
    });

    socket.on('disconnect', () => {
      console.log(chalk.red(`${socket.id} is disconnected`));
      console.log(cache.sockets);
      const game = cache.removeSocket(socket.id);
      if (game) {
        console.log(game.sockets);
        game.removeSocket(socket.id);
        console.log(game.sockets);
      }
    });
  });
};
