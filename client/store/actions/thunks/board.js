import * as action from '../actionCreators';
import socket from '../../../socket';

export const setBoardThunk = board => (dispatch, getState) => {
  console.log('calling thunk with', board);
  const { game } = getState();
  socket.emit('updateBoard', action.setBoard(board), game);
};
