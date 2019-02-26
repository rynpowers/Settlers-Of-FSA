import { TOGGLE_MENU, TOGGLE_MODAL } from '../actions';

const initailState = {
  main: false,
  modal: false,
};

const menu = (state = initailState, action) => {
  switch (action.type) {
    case TOGGLE_MENU:
      return { ...state, main: !state.main };
    case TOGGLE_MODAL:
      return { ...state, modal: !state.modal };
    default:
      return state;
  }
};

export default menu;
