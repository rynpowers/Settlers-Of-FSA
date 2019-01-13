import * as action from '../actionCreators';
import axios from 'axios';

export const loginThunk = user => dispatch => {
  dispatch(action.login(user));
};

export const getMeThunk = fn => async dispatch => {
  try {
    const { data } = await axios.get('/auth/me');
    dispatch(action.login(data));
    fn();
  } catch (err) {
    console.log(err);
  }
};
