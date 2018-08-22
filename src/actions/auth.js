import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  KEEP_USER_LOGGED_IN,

  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE
} from './types';
import { database } from '../firebase/firebase';
import api from '../api/api';

export const loginRequest = () => ({
  type: LOGIN_REQUEST
});
export const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  user
});
export const loginFailure = (message) => ({
  type: LOGIN_FAILURE,
  message
});
export const keepUserLoggedIn = (user) => ({
  type: KEEP_USER_LOGGED_IN,
  user
});

export const login = (credentials) => async (dispatch) => {
  try {
    dispatch(loginRequest());
    const user = await api.auth.login(credentials);
    return dispatch(loginSuccess(user));
  } catch(err) {
    return dispatch(loginFailure(err.message));
  }
};

export const logoutRequest = () => ({
  type: LOGOUT_REQUEST
});
export const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS
});
export const logoutFailure = (message) => ({
  type: LOGOUT_FAILURE,
  message
});

export const logout = () => async (dispatch) => {
  try {
    dispatch(logoutRequest());
    await api.auth.logout();
    return dispatch(logoutSuccess());
  } catch(err) {
    return dispatch(logoutFailure(err.message));
  }
}
