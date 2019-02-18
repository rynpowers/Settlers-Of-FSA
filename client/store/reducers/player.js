import { SET_PLAYER } from '../actions';

const player = (state = {}, action) => {
  switch (action.type) {
    case SET_PLAYER:
      return action.player;
    default:
      return state;
  }
};

export default player;
