/* eslint-disable no-underscore-dangle */
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
  DELETE_TASK,
  DELETE_TASK_ERROR,
  DELETE_TASK_SUCCESS,
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
      case DELETE_TASK:
        draft.loading = true;
        break;

      case LOAD_TASKS_ERROR:
      case DELETE_TASK_ERROR:
        draft.loading = false;
        draft.error = true;
        break;

      case LOAD_TASKS_SUCCESS:
        draft.loading = false;
        draft.tasks = action.payload.tasks;
        break;

      case DELETE_TASK_SUCCESS:
        draft.loading = false;
        draft.tasks = draft.tasks.filter(
          task => task._id !== action.payload.taskId,
        );
        break;

      case DEFAULT_ACTION:
        break;
    }
  });

export default maintainTaskReducer;
