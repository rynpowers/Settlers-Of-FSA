import { TOGGLE_MENU } from '../actions';

const menu = (state = false, action) => {
  switch (action.type) {
    case TOGGLE_MENU:
      return !state;
    default:
      return state;
  }
};

export default menu;
