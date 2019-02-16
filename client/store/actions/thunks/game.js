import * as action from '../actionCreators';
import socket from '../../../socket';

export const joinGameThunk = (game, fn) => dispatch => {
  socket.emit('join-game', game);
  dispatch(action.setGame(game));
  fn();
};
