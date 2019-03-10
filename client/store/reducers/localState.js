import { UPDATE_MODE, RESET, OFFER_TRADE, UPDATE_OFFER } from '../actions';

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
    case UPDATE_OFFER:
      return { ...state, offer: action.offer };
    case OFFER_TRADE:
      return { ...state, mode: 'offer-trade', offer: action.offer };
    case RESET:
      return { ...state, mode: '' };
    default:
      return state;
  }
};

export default localState;
