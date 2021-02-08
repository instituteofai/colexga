import { UPDATE_GLOBAL_NOTIFICATION } from './constants';

export function updateGlobalNotification(notification) {
  return {
    type: UPDATE_GLOBAL_NOTIFICATION,
    notification,
  };
}
