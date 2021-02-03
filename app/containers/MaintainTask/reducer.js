/*
 *
 * MaintainTask reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  LOAD_TASKS,
  LOAD_TASKS_ERROR,
  LOAD_TASKS_SUCCESS,
} from './constants';

export const initialState = {
  loading: false,
  error: false,
  tasks: [],
};

/* eslint-disable default-case, no-param-reassign */
const maintainTaskReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_TASKS:
        draft.loading = true;
        break;

      case LOAD_TASKS_ERROR:
        draft.loading = false;
        draft.error = true;
        break;

      case LOAD_TASKS_SUCCESS:
        draft.loading = false;
        draft.tasks = action.payload.tasks;
        break;

      case DEFAULT_ACTION:
        break;
    }
  });

export default maintainTaskReducer;
