/*
 *
 * TaskDetails reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  ADD_TASK,
  ADD_TASK_ERROR,
  ADD_TASK_SUCCESS,
  LOAD_TASK,
  LOAD_TASK_ERROR,
  LOAD_TASK_SUCCESS,
  UPDATE_TASK,
  UPDATE_TASK_ERROR,
  UPDATE_TASK_SUCCESS,
} from './constants';

export const initialState = {
  loading: false,
  error: false,
  task: {},
};

/* eslint-disable default-case, no-param-reassign */
const taskDetailsReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;

      case ADD_TASK:
      case LOAD_TASK:
      case UPDATE_TASK:
        draft.loading = true;
        break;

      case ADD_TASK_ERROR:
      case LOAD_TASK_ERROR:
      case UPDATE_TASK_ERROR:
        draft.loading = false;
        draft.error = true;
        break;

      case ADD_TASK_SUCCESS:
      case LOAD_TASK_SUCCESS:
      case UPDATE_TASK_SUCCESS:
        draft.loading = false;
        draft.task = action.payload.task;
    }
  });

export default taskDetailsReducer;
