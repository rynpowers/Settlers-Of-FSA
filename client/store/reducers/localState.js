import { UPDATE_MODE, RESET, OFFER_TRADE } from '../actions';

const initailState = {
  mode: '',
};

const localState = (state = initailState, action) => {
  switch (action.type) {
    case UPDATE_MODE:
      return { ...state, mode: action.mode };
    case OFFER_TRADE:
      return { ...state, mode: 'offer-trade' };
    case RESET:
      return { ...state, mode: '' };
    default:
      return state;
  }
};

export default localState;
