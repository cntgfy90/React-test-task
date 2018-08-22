import { combineReducers } from 'redux';
// Reducers
import authReducer from './auth';
import eventsReducer from './events';

export default combineReducers({
  auth: authReducer,
  events: eventsReducer
});
