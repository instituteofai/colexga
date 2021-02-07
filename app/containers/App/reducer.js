/*
 * AppReducer

 *
 */

import produce from 'immer';
import { UPDATE_GLOBAL_NOTIFICATION } from './constants';

export const initialState = {
  currentUser: false,
  notification: {
    type: false,
    message: false,
  },
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case UPDATE_GLOBAL_NOTIFICATION:
        draft.notification = action.notification;
        break;
    }
  });

export default appReducer;
