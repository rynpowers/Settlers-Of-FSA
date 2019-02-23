const chalk = require('chalk');
const cache = require('./cache/gameCache');

module.exports = io => {
  io.on('connection', socket => {
    console.log(chalk.blue(`${socket.id} is connected`));

    socket.on('join-game', (room, player) => {
      socket.join(room);
      console.log(
        chalk.yellow(
          `${socket.id} is joining room:`,
          room,
          `as player-${player}`
        )
      );
    });

    socket.on('updateBoard', ({ type, playerNumber, game, id }) => {
      console.log('updating road:', id, playerNumber, game);
      io.to(game).emit('dispatch', {
        type: 'SET_BOARD',
        board: cache.update({ type, playerNumber, game, id }),
      });
    });

    socket.on('disconnect', () => {
      console.log(chalk.red(`${socket.id} is disconnected`));
    });
  });
};
