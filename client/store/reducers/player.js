import { SET_PLAYER, UPDATE_GAME } from '../actions';

const initialState = {
  resources: {
    forest: 0,
    hill: 0,
    pasture: 0,
    mountain: 0,
    field: 0,
  },
};

const player = (state = initialState, action) => {
  switch (action.type) {
    case SET_PLAYER:
      return action.player;
    case UPDATE_GAME:
      return action.player;
    default:
      return state;
  }
};

export default player;
