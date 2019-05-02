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

    socket.on('incoming-trade', trade => {
      const { game, accepted, trades } = cache.updateGame(trade);
      if (accepted) {
        io.to(trade.game).emit('dispatch', { type: 'SET_GAME', game });
      } else {
        socket.broadcast.to(trade.game).emit('trades', { trades });
      }
    });

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

    socket.on('get-card', payload => {
      const { game } = cache.updateGame(payload);
      console.log(game);
      // io.to(payload.game).emit('dispatch', { type: 'SET_GAME', game });
    });

    socket.on('flash', payload => {
      const { game } = cache.updateGame(payload);
      io.to(game.name).emit('dispatch', { type: 'SET_GAME', game });
    });

    socket.on('message', message => {
      const { messages } = cache.updateGame(message);
      socket.broadcast.to(message.game).emit('messages', { messages });
    });

    socket.on('get', (key, room) => {
      const game = cache.games[room];
      game.send(key, payload => {
        io.to(socket.id).emit(key, payload);
      });
    });

    socket.on('updateBoard', update => {
      const { board } = cache.updateGame(update);
      io.to(update.game).emit('dispatch', { type: 'SET_BOARD', board });
    });

    socket.on('updateGame', update => {
      const { game } = cache.updateGame(update);
      io.to(update.game).emit('dispatch', { type: 'SET_GAME', game });
    });

    socket.on('updatePlayer', (game, playerNumber) => {
      const player = cache.updatePlayer(game, playerNumber);
      io.to(socket.id).emit('dispatch', { type: 'SET_PLAYER', player });
    });

    socket.on('disconnect', () => {
      console.log(chalk.red(`${socket.id} is disconnected`));
    });
  });
};
