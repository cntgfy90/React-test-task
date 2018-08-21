import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,

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
      const user = action.user;
      return {
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
      return {};
    case LOGOUT_SUCCESS:
      return {};
    case LOGOUT_FAILURE:
      return {
        user: {},
        isLoading: false,
        didInvalidate: action.message
      };
    default:
      return state;
  }
};
