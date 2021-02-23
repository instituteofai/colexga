import {
  GET_USER,
  SHOW_GLOBAL_NOTIFICATION,
  HIDE_GLOBAL_NOTIFICATION,
  UPDATE_USER,
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
