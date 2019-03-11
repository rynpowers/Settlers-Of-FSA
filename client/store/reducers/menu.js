import {
  TOGGLE_MENU,
  TOGGLE_MODAL,
  TOGGLE_EXIT_MENU,
  RESET,
  OFFER_TRADE,
  UPDATE_MODAL_VIEW,
} from '../actions';

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
    case OFFER_TRADE:
      return { ...state, modal: true, modalView: 'offer-trade' };
    case TOGGLE_MODAL:
      return { ...state, modal: !state.modal, modalView: action.view };
    case UPDATE_MODAL_VIEW:
      return { ...state, modalView: action.view };
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
