import { SET_BOARD } from '../actions';

const board = (state = {}, action) => {
  switch (action.type) {
    case SET_BOARD:
      console.log(action.board);
      return action.board;
    default:
      return state;
  }
};

export default board;
