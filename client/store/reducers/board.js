import { SET_BOARD, SET_ROAD } from '../actions';

const board = (state = {}, action) => {
  switch (action.type) {
    case SET_BOARD:
      return action.board;
    case SET_ROAD:
      return {
        ...state,
        roads: {
          ...state.roads,
          [action.id]: { ...state.roads[action.id], player: action.player },
        },
      };
    default:
      return state;
  }
};

export default board;
