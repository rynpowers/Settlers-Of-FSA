import axios from 'axios';
import * as action from '../actionCreators';
import socket from '../../../socket';

export const joinGameThunk = (game, success, fail) => async dispatch => {
  try {
    const { data } = await axios.post('/api/games', { name: game });
    const { player, gameState, board } = data;
    dispatch(action.updateGame(gameState, board, player));
    window.sessionStorage.setItem('game', data.gameState.name);
    socket.emit('join-game', gameState.name, player.playerNumber);
    if (success) success();
  } catch (err) {
    fail();
  }
};
