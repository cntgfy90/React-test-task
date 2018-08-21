import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  KEEP_USER_LOGGED_IN,

  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE
} from '../actions/types';

const initialState = {
  user: {},
  isLoading: false,
  didInvalidate: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case LOGIN_SUCCESS:
    case KEEP_USER_LOGGED_IN:
      const user = action.user;
      return {
        ...state,
        isLoading: false,
        didInvalidate: false,
        user: {...user}
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        didInvalidate: action.message
      };
    case LOGOUT_REQUEST:
      return state;
    case LOGOUT_SUCCESS:
      return {};
    case LOGOUT_FAILURE:
      return state;
    default:
      return state;
  }
};
