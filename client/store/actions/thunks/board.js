import socket from '../../../socket';
import { setRoad } from '../actionCreators';
import { longestRoad } from '../../../validators';

export const updateBoardThunk = (id, type) => (dispatch, getState) => {
  const { playerNumber } = getState().player;
  const game = window.sessionStorage.getItem('game');
  socket.emit('updateBoard', { type, playerNumber, game, id });
};

export const updateRoadThunk = (payload, fn) => (dispatch, getState) => {
  const { id, player } = payload;
  dispatch(setRoad(id, player));
  const { roads, settlements } = getState().board;
  const maxRoad = longestRoad(id.split('-')[0], settlements, roads, player);
  payload.longestRoad = maxRoad;
  socket.emit(payload.type, payload);
  fn();
};
