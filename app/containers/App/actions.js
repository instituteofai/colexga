import { GET_USER, UPDATE_GLOBAL_NOTIFICATION, UPDATE_USER } from './constants';

export function updateGlobalNotification(notification) {
  return {
    type: UPDATE_GLOBAL_NOTIFICATION,
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
