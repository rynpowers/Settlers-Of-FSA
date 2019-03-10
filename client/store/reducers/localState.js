import { UPDATE_MODE, RESET, INIT_TRADE } from '../actions';

const initailState = {
  mode: '',
};

const localState = (state = initailState, action) => {
  switch (action.type) {
    case UPDATE_MODE:
      return { ...state, mode: action.mode };
    case INIT_TRADE:
      return { ...state, mode: 'trade' };
    case RESET:
      return { ...state, mode: '' };
    default:
      return state;
  }
};

export default localState;
