import { combineReducers } from 'redux';
import user from './user';
import game from './game';
import board from './board';
import player from './player';

const reducer = combineReducers({
  user,
  game,
  board,
  player,
});

export default reducer;
