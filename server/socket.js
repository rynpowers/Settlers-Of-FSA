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

    socket.on('tradeOffer', ({ trade, playerNumber, game }) => {
      const curGame = cache.games[game];
      curGame.createTrade(trade, playerNumber, (socketId, offer) => {
        io.to(socketId).emit('dispatch', { type: 'OFFER_TRADE', offer });
      });
      console.log('trade offer submitted', trade, game);
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
