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
  LOAD_TASK,
  LOAD_TASK_ERROR,
  LOAD_TASK_SUCCESS,
  UPDATE_TASK,
  UPDATE_TASK_ERROR,
  UPDATE_TASK_SUCCESS,
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

export function loadTask(testId, taskId) {
  return {
    type: LOAD_TASK,
    payload: {
      testId,
      taskId,
    },
  };
}

export function loadTaskSuccess(task) {
  return {
    type: LOAD_TASK_SUCCESS,
    payload: { task },
  };
}

export function loadTaskError(error) {
  return {
    type: LOAD_TASK_ERROR,
    payload: { error },
  };
}

export function updateTask(testId, taskId, task) {
  return {
    type: UPDATE_TASK,
    payload: { testId, taskId, task },
  };
}

export function updateTaskSuccess(task) {
  return {
    type: UPDATE_TASK_SUCCESS,
    payload: { task },
  };
}

export function updateTaskError(error) {
  return {
    type: UPDATE_TASK_ERROR,
    payload: { error },
  };
}
