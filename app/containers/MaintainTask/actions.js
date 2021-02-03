/*
 *
 * MaintainTask actions
 *
 */

import {
  DEFAULT_ACTION,
  LOAD_TASKS,
  LOAD_TASKS_SUCCESS,
  LOAD_TASKS_ERROR,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function loadTasks(testId) {
  return {
    type: LOAD_TASKS,
    payload: { testId },
  };
}

export function loadTasksError() {
  return {
    type: LOAD_TASKS_ERROR,
  };
}

export function loadTasksSuccess(tasks) {
  return {
    type: LOAD_TASKS_SUCCESS,
    payload: { tasks },
  };
}
