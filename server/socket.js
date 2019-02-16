const chalk = require('chalk');
const GameCenter = require('./game');

let games = new GameCenter();

module.exports = io => {
  io.on('connection', socket => {
    console.log(chalk.blue(`${socket.id} is connected`));

    socket.emit('rejoin');

    socket.on('join-game', room => {
      socket.join(room);
      games.sendGame(io, socket, room);
      console.log(`${socket.id} is joining room: ${room}`);
    });

    socket.on('updateBoard', (action, room) => {
      board = action.board;
      console.log('emitting dispatch');
      io.to(room).emit('dispatch', { type: action.type, board });
    });

    socket.on('disconnect', () => {
      console.log(chalk.red(`${socket.id} is disconnected`));
    });
  });
};
