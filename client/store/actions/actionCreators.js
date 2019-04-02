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
export const updateOffer = offer => ({ type: type.UPDATE_OFFER, offer });

// board
export const setBoard = board => ({ type: type.SET_BOARD, board });

// player
export const setPlayer = player => ({ type: type.SET_PLAYER, player });

// menu
export const toggleMenu = () => ({ type: type.TOGGLE_MENU });
export const toggleModal = view => ({ type: type.TOGGLE_MODAL, view });
export const updateModalView = view => ({ type: type.UPDATE_MODAL_VIEW, view });
export const toggleExitMenu = () => ({ type: type.TOGGLE_EXIT_MENU });
