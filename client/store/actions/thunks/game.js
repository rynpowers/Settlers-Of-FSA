import axios from 'axios';
import * as action from '../actionCreators';
export const joinGameThunk = (game, fn) => async dispatch => {
  try {
    const { data } = await axios.post('/api/games', { name: game });
    dispatch(action.setGame(data.game));
    dispatch(action.setBoard(data.board));
    dispatch(action.setPlayer(data.player));
    fn();
  } catch (err) {
    console.log(err);
  }
};
