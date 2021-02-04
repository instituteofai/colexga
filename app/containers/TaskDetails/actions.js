/*
 *
 * TaskDetails actions
 *
 */

import {
  DEFAULT_ACTION,
  ADD_TASK,
  ADD_TASK_ERROR,
  ADD_TASK_SUCCESS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function addTask(testId, task) {
  return {
    type: ADD_TASK,
    payload: { testId, task },
  };
}

export function addTaskSuccess(task) {
  return {
    type: ADD_TASK_SUCCESS,
    payload: { task },
  };
}

export function addTaskError(error) {
  return {
    type: ADD_TASK_ERROR,
    payload: { error },
  };
}
