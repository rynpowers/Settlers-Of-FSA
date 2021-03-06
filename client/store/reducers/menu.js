import { TOGGLE_MENU, TOGGLE_EXIT_MENU, RESET } from '../actions';

const initailState = {
  main: false,
  modal: false,
  exit: false,
  modalView: '',
};

const menu = (state = initailState, action) => {
  switch (action.type) {
    case TOGGLE_MENU:
      return { ...state, main: !state.main };
    case TOGGLE_EXIT_MENU:
      return {
        ...state,
        modal: !state.modal,
        exit: !state.exit,
        main: !state.main,
      };
    case RESET:
      return initailState;
    default:
      return state;
  }
};

export default menu;
