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
  DELETE_TASK,
  DELETE_TASK_ERROR,
  DELETE_TASK_SUCCESS,
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

export function deleteTask(testId, taskId) {
  return {
    type: DELETE_TASK,
    payload: { testId, taskId },
  };
}

export function deleteTaskSuccess(testId, taskId) {
  return {
    type: DELETE_TASK_SUCCESS,
    payload: { testId, taskId },
  };
}

export function deleteTaskError(error) {
  return {
    type: DELETE_TASK_ERROR,
    payload: { error },
  };
}
