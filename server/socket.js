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
      const game = cache.games[trade.room];
      const trades = game.update(trade);
      socket.broadcast.to(trade.room).emit('trades', { trades });
    });

    socket.on('message', message => {
      const game = cache.games[message.room];
      const messages = game.update(message);
      socket.broadcast.to(message.room).emit('messages', { messages });
    });

    socket.on('get', (key, room) => {
      const game = cache.games[room];
      game.send(key, payload => {
        io.to(socket.id).emit(key, payload);
      });
    });

    socket.on('updateBoard', update => {
      const board = cache.update(update);
      io.to(update.game).emit('dispatch', { type: 'SET_BOARD', board });
    });

    socket.on('updateGame', update => {
      const game = cache.update(update);
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
