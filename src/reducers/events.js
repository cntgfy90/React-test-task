import {
  CREATE_EVENT_REQUEST = 'CREATE_EVENT_REQUEST',
  CREATE_EVENT_SUCCESS = 'CREATE_EVENT_SUCCESS',
  CREATE_EVENT_FAILURE = 'CREATE_EVENT_FAILURE',

  EDIT_EVENT_REQUEST = 'EDIT_EVENT_REQUEST',
  EDIT_EVENT_SUCCESS = 'EDIT_EVENT_SUCCESS',
  EDIT_EVENT_FAILURE = 'EDIT_EVENT_FAILURE',

  REMOVE_EVENT_REQUEST = 'REMOVE_EVENT_REQUEST',
  REMOVE_EVENT_SUCCESS = 'REMOVE_EVENT_SUCCESS',
  REMOVE_EVENT_FAILURE = 'REMOVE_EVENT_FAILURE',

  FETCH_EVENT_REQUEST = 'FETCH_EVENT_REQUEST',
  FETCH_EVENT_SUCCESS = 'FETCH_EVENT_SUCCESS',
  FETCH_EVENT_FAILURE = 'FETCH_EVENT_FAILURE'
} from '../actions/types';

const initialState = {
  items: [],
  isLoading,
  didInvalidate
};

export default (state = initialState, action) {
  switch(action.type) {
    case CREATE_EVENT_REQUEST:
    case FETCH_EVENT_REQUEST:
    case EDIT_EVENT_REQUEST:
    case REMOVE_EVENT_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case CREATE_EVENT_FAILURE:
    case FETCH_EVENT_FAILURE:
    case EDIT_EVENT_FAILURE:
    case REMOVE_EVENT_FAILURE:
      return {
        ...state,
        isLoading: false,
        didInvalidate: action.err.message
      };
    case CREATE_EVENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        items: [...items, action.event]
      };
    case FETCH_EVENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        items: [...action.events]
      };
    case EDIT_EVENT_SUCCESS:
      const item = state.items.map((event) => {
        if (event.id === action.id) {
          return {
            ...event,
            ...action.updates
          };
        } else {
          return event;
        }
      });
      return {
        ...state,
        items: [...items, item]
      };
    case REMOVE_EVENT_SUCCESS:
      const newItems = state.items.filter((event) => event.id !== action.id);
      return {
        ...state,
        isLoading: false,
        items: [...newItems]
      };
    default:
      return state;
  }
};
