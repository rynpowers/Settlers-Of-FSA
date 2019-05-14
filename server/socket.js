const chalk = require('chalk');
const cache = require('./cache/gameCache');

module.exports = io => {
  io.on('connection', socket => {
    console.log(chalk.blue(`${socket.id} is connected`));

    socket.on('join-game', (room, player) => {
      socket.join(room);
      cache.games[room].addSocket(socket.id, player);
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
      const curGame = cache.getCurGame(payload.game);
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
      const curGame = cache.getCurGame(payload.game);
      const { messages } = curGame.update(payload);
      socket.broadcast.to(payload.game).emit('messages', { messages });
    });

    socket.on('disconnect', () => {
      console.log(chalk.red(`${socket.id} is disconnected`));
    });
  });
};
