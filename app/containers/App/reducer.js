/*
 * AppReducer

 *
 */

import produce from 'immer';
import {
  SHOW_GLOBAL_NOTIFICATION,
  HIDE_GLOBAL_NOTIFICATION,
  UPDATE_USER,
  GET_USER,
} from './constants';

export const initialState = {
  user: false,
  notification: {
    type: false,
    message: false,
  },
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SHOW_GLOBAL_NOTIFICATION:
        draft.notification = action.notification;
        break;
      case HIDE_GLOBAL_NOTIFICATION:
        draft.notification = action.notification;
        break;
      case GET_USER:
        break;
      case UPDATE_USER:
        draft.user = action.user;
        break;
    }
  });

export default appReducer;
