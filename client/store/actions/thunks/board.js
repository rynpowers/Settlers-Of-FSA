import socket from '../../../socket';

export const updateBoardThunk = (id, type) => (dispatch, getState) => {
  const { playerNumber } = getState().player;
  const game = window.sessionStorage.getItem('game');
  socket.emit('updateBoard', { type, playerNumber, game, id });
};

// export const updateSettlementsThunk = settlementId => (dispatch, getState) => {
//   const { player } = getState();
//   const game = window.sessionStorage.getItem('game');
//   socket.emit('updateSettlement', settlementId, player.playerNumber, game);
// };
