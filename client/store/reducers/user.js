import { LOGIN, LOGOUT } from '../actions';

const user = (state = {}, action) => {
  switch (action.type) {
    case LOGIN:
      return action.user;
    case LOGOUT:
      return {};
    default:
      return state;
  }
};

export default user;
