import axios from 'axios';
import * as action from '../actionCreators';
import socket from '../../../socket';

export const joinGameThunk = (game, success, fail) => async dispatch => {
  try {
    const { data } = await axios.post('/api/games', { name: game });
    dispatch(action.setGame(data.game));
    dispatch(action.setBoard(data.board));
    dispatch(action.setPlayer(data.player));
    window.sessionStorage.setItem('game', game);
    socket.emit('join-game', game);
    if (success) success();
  } catch (err) {
    console.log(err);
    fail();
  }
};
