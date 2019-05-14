import * as type from './actionTypes';
// user
export const login = user => ({ type: type.LOGIN, user });
export const logout = () => ({ type: type.LOGOUT });

// game
export const setGame = game => ({
  type: type.SET_GAME,
  game,
});
export const reset = () => ({ type: type.RESET });
export const updateMode = mode => ({ type: type.UPDATE_MODE, mode });
export const updateGame = (game, board, player) => ({
  type: type.UPDATE_GAME,
  game,
  board,
  player,
});
export const updateTrades = (trade, player) => ({
  type: type.UPDATE_TRADES,
  trade,
  player,
});

// board
export const setBoard = board => ({ type: type.SET_BOARD, board });
export const setRoad = (id, player) => ({ type: type.SET_ROAD, id, player });

// player
export const setPlayer = player => ({ type: type.SET_PLAYER, player });

// menu
export const toggleMenu = () => ({ type: type.TOGGLE_MENU });
export const toggleExitMenu = () => ({ type: type.TOGGLE_EXIT_MENU });
