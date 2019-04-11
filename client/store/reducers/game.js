import { SET_GAME, UPDATE_MODE, RESET } from '../actions';

const initailState = {
  mode: '',
  players: {},
};

const game = (state = initailState, action) => {
  switch (action.type) {
    case UPDATE_MODE:
      return { ...state, mode: action.mode };
    case RESET:
      return { ...state, mode: '' };
    case SET_GAME:
      return action.game;
    default:
      return state;
  }
};

export default game;
