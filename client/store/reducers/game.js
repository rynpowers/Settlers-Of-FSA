import { SET_GAME } from '../actions';

const initailState = {
  players: {},
};

const game = (state = initailState, action) => {
  switch (action.type) {
    case SET_GAME:
      return action.game;
    default:
      return state;
  }
};

export default game;
