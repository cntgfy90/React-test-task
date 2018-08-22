import {
  CREATE_EVENT_REQUEST,
  CREATE_EVENT_SUCCESS,
  CREATE_EVENT_FAILURE,

  EDIT_EVENT_REQUEST,
  EDIT_EVENT_SUCCESS,
  EDIT_EVENT_FAILURE,

  REMOVE_EVENT_REQUEST,
  REMOVE_EVENT_SUCCESS,
  REMOVE_EVENT_FAILURE,

  FETCH_EVENT_REQUEST,
  FETCH_EVENT_SUCCESS,
  FETCH_EVENT_FAILURE
} from './types';
import api from '../api/api';

// CREATE
export const createEventRequest = () => ({
  type: CREATE_EVENT_REQUEST
});
export const createEventSuccess = (event) => ({
  type: CREATE_EVENT_SUCCESS,
  event
});
export const createEventFailure = (err) => ({
  type: CREATE_EVENT_FAILURE,
  err
});
export const createEvent = (data) => async (dispatch, getState) => {
  try {
    const uid = getState().auth.user.uid;
    dispatch(createEventRequest());
    const key = await api.events.create(uid, data);
    return dispatch(createEventSuccess({
      id: key,
      ...data
    }));
  } catch(err) {
    return dispatch(createEventFailure(err));
  }
};

// READ
export const fetchEventsRequest = () => ({
  type: FETCH_EVENT_REQUEST
});
export const fetchEventsSuccess = (events) => ({
  type: FETCH_EVENT_SUCCESS,
  events
});
export const fetchEventsFailure = (err) => ({
  type: FETCH_EVENT_FAILURE,
  err
});
export const fetchEvents = () => async (dispatch, getState) => {
  try {
    const uid = getState().auth.user.uid;
    console.log(uid)
    dispatch(fetchEventsRequest());
    const events = await api.events.fetch(uid);
    return dispatch(fetchEventsSuccess(events));
  } catch(err) {
    return dispatch(fetchEventsFailure(err));
  }
}

// UPDATE
export const editEventRequest = () => ({
  type: EDIT_EVENT_REQUEST
});
export const editEventSuccess = (id, updates) => ({
  type: EDIT_EVENT_SUCCESS,
  id,
  updates
});
export const editEventFailure = (err) => ({
  type: EDIT_EVENT_FAILURE,
  err
});
export const editEvent = (id, updates) => async (dispatch, getState) => {
  try {
    const uid = getState().auth.user.uid;
    dispatch(editEventRequest());
    await api.events.update(uid, id, updates);
    return dispatch(editEventSuccess(id, updates));
  } catch(err) {
    return dispatch(editEventFailure(err));
  }
};

// DELETE
export const removeEventRequest = () => ({
  type: REMOVE_EVENT_REQUEST
});
export const removeEventSuccess = (id) => ({
  type: REMOVE_EVENT_SUCCESS,
  id
});
export const removeEventFailure = (err) => ({
  type: REMOVE_EVENT_FAILURE,
  err
});
export const removeEvent = (id) => async (dispatch, getState) => {
  try {
    const uid = getState().auth.user.uid;
    dispatch(removeEventRequest());
    await api.events.delete(uid, id);
    return dispatch(removeEventSuccess(id));
  } catch(err) {
    return dispatch(removeEventFailure(err));
  }
};
