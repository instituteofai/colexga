import {
  GET_USER,
  SHOW_GLOBAL_NOTIFICATION,
  HIDE_GLOBAL_NOTIFICATION,
  UPDATE_USER,
  FETCH_USER_SUBMISSIONS,
  LOAD_USER_SUBMISSIONS,
} from './constants';

export function showGlobalNotification(notification) {
  return {
    type: SHOW_GLOBAL_NOTIFICATION,
    notification,
  };
}

export function hideGlobalNotification(notification) {
  return {
    type: HIDE_GLOBAL_NOTIFICATION,
    notification,
  };
}

export function getUser() {
  return {
    type: GET_USER,
  };
}

export function updateUser(user) {
  return {
    type: UPDATE_USER,
    user,
  };
}

export function getUserSubmissions(userId) {
  return {
    type: FETCH_USER_SUBMISSIONS,
    userId,
  };
}
export function loadSubmissions(userSubmissions) {
  return {
    type: LOAD_USER_SUBMISSIONS,
    userSubmissions,
  };
}
