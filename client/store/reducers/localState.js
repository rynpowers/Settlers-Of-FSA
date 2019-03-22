import { UPDATE_MODE, RESET } from '../actions';

const initailState = {
  mode: '',
  offer: {
    forest: 0,
    hill: 0,
    field: 0,
    mountain: 0,
    pasture: 0,
  },
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
