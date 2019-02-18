const chalk = require('chalk');
const gameCache = require('./cache');

module.exports = io => {
  io.on('connection', socket => {
    console.log(chalk.blue(`${socket.id} is connected`));

    socket.on('join-game', room => {
      socket.join(room);
      console.log(chalk.yellow(`${socket.id} is joining room:`, room));
    });

    socket.on('updateBoard', (action, room) => {
      // board = action.board;
      // console.log('emitting dispatch');
      // io.to(room).emit('dispatch', { type: action.type, board });
    });

    socket.on('disconnect', () => {
      console.log(chalk.red(`${socket.id} is disconnected`));
    });
  });
};
