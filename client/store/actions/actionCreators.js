import * as type from './actionTypes';
// user
export const login = user => ({ type: type.LOGIN, user });
export const logout = () => ({ type: type.LOGOUT });

// game
export const setGame = game => ({ type: type.SET_GAME, game });

// board
export const setBoard = board => ({ type: type.SET_BOARD, board });
