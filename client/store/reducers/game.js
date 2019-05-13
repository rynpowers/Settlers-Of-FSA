import { SET_GAME, UPDATE_MODE, RESET, UPDATE_GAME } from '../actions';

const initailState = {
  mode: '',
  players: {},
};

const game = (state = initailState, action) => {
  switch (action.type) {
    case UPDATE_MODE:
      return { ...state, mode: action.mode || '' };
    case UPDATE_GAME:
      return action.game;
    case RESET:
      return { ...state, mode: '' };
    case SET_GAME:
      return action.game;
    default:
      return state;
  }
};

export default game;
