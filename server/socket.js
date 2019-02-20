const chalk = require('chalk');
const cache = require('./cache/gameCache');

module.exports = io => {
  io.on('connection', socket => {
    console.log(chalk.blue(`${socket.id} is connected`));

    socket.on('join-game', room => {
      socket.join(room);
      console.log(chalk.yellow(`${socket.id} is joining room:`, room));
    });

    socket.on('updateRoad', (road, player, room) => {
      console.log('updating road:', road, player, room);
      io.to(room).emit('dispatch', {
        type: 'SET_BOARD',
        board: cache.updateRoad(road, player, room),
      });
    });

    socket.on('disconnect', () => {
      console.log(chalk.red(`${socket.id} is disconnected`));
    });
  });
};
