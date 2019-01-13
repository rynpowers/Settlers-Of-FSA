import * as type from './actionTypes';
// user
export const login = user => ({ type: type.LOGIN, user });
export const logout = () => ({ type: type.LOGOUT });
