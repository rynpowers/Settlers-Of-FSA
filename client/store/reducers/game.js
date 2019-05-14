import {
  SET_GAME,
  UPDATE_MODE,
  RESET,
  UPDATE_GAME,
  UPDATE_TRADES,
} from '../actions';

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
    case UPDATE_TRADES:
      return {
        ...state,
        trades: { ...state.trades, [action.player]: action.trade },
      };
    case RESET:
      return { ...state, mode: '' };
    case SET_GAME:
      return action.game;
    default:
      return state;
  }
};

export default game;
