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

    // ROBBER

    socket.on('robbing-player', payload => {
      const { game } = cache.updateGame(payload);
      io.to(game.name).emit('dispatch', { type: 'SET_GAME', game });
    });

    socket.on('move-robber', payload => {
      const { board, game } = cache.updateGame(payload);
      io.to(payload.game).emit('dispatch', { type: 'SET_BOARD', board });
      io.to(payload.game).emit('dispatch', { type: 'SET_GAME', game });
    });

    socket.on('rob-settlement', payload => {
      const { game } = cache.updateGame(payload);
      io.to(payload.game).emit('dispatch', { type: 'SET_GAME', game });
    });

    // DEVELOPMENT

    socket.on('get-card', payload => {
      const { game } = cache.updateGame(payload);
      io.to(payload.game).emit('dispatch', { type: 'SET_GAME', game });
    });

    socket.on('play-card', payload => {
      const { game, board } = cache.updateGame(payload);
      io.to(payload.game).emit('dispatch', { type: 'SET_GAME', game });
      board &&
        io.to(payload.game).emit('dispatch', { type: 'SET_BOARD', board });
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

    // FLASH

    socket.on('flash', payload => {
      const { game } = cache.updateGame(payload);
      io.to(game.name).emit('dispatch', { type: 'SET_GAME', game });
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
