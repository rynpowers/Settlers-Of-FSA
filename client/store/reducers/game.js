import { SET_GAME } from '../actions';

const game = (state = '', action) => {
  switch (action.type) {
    case SET_GAME:
      return action.game;
    default:
      return state;
  }
};

export default game;
