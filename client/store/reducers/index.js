import { combineReducers } from 'redux';
import user from './user';
import game from './game';
import board from './board';
import player from './player';
import menu from './menu';

const reducer = combineReducers({
  user,
  game,
  board,
  player,
  menu,
});

export default reducer;
