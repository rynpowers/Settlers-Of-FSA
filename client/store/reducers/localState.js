import { UPDATE_MODE, RESET } from '../actions';

const initailState = {
  mode: '',
};

const localState = (state = initailState, action) => {
  switch (action.type) {
    case UPDATE_MODE:
      return { ...state, mode: action.mode };
    case RESET:
      return { ...state, mode: '' };
    default:
      return state;
  }
};

export default localState;
