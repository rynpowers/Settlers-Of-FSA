import axios from 'axios';
import * as action from '../actionCreators';
import socket from '../../../socket';

export const joinGameThunk = (game, success, fail) => async dispatch => {
  try {
    const { data } = await axios.post('/api/games', { name: game });
    console.log('too client', data);
    const { player, gameState, board } = data;
    dispatch(action.setGame(gameState));
    dispatch(action.setBoard(board));
    dispatch(action.setPlayer(player));
    window.sessionStorage.setItem('game', data.gameState.name);
    socket.emit('join-game', gameState.name, player.playerNumber);
    if (success) success();
  } catch (err) {
    console.log(err);
    fail();
  }
};
