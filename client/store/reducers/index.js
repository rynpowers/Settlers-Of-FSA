import { combineReducers } from 'redux';
import user from './user';
import game from './game';
import board from './board';
import player from './player';
import menu from './menu';
import localState from './localState';

const reducer = combineReducers({
  user,
  game,
  board,
  player,
  menu,
  localState,
});

export default reducer;
