import * as action from '../actionCreators';
import axios from 'axios';

export const loginThunk = ({
  path,
  email,
  password,
  onLoginFail,
}) => async dispatch => {
  try {
    const { data } = await axios.post(`/auth${path}`, { email, password });
    dispatch(action.login(data));
  } catch (err) {
    onLoginFail();
  }
};

export const logoutThunk = user => async dispatch => {
  try {
    await axios.delete('/auth/logout', { user });
    dispatch(action.logout(user));
  } catch (err) {
    console.log(err);
  }
};

export const getMeThunk = fn => async dispatch => {
  try {
    console.log('TRYING TO CALL AUTH/ME');
    const { data } = await axios.get('/auth/me');
    dispatch(action.login(data || {}));
    fn();
  } catch (err) {
    console.log(err);
  }
};
