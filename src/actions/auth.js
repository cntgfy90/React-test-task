import {
  LOGIN,
  LOGOUT
} from './types';
import api from '../api/api';

export const login = (uid) => ({
  type: LOGIN,
  uid
});

export const startLogin = (credentials) => () => {
  return api.auth.login(credentials);
};

export const logout = () => ({
  type: LOGOUT
});

export const startLogout = () => () => {
  return api.auth.logout();
};
