import * as action from '../actionCreators';
import socket from '../../../socket';

export const setPlayerThunk = player => (dispatch, getState) => {
  console.log('calling thunk with', player);
  const { game } = getState();
  socket.emit('updatePlayer', action.setBoard(player), game);
};
