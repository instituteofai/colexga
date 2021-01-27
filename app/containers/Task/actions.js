/*
 *
 * Task actions
 *
 */

import { LOAD_TASK, LOAD_TASK_ERROR, LOAD_TASK_SUCCESS } from './constants';

/**
 * Load a task, this action starts the request saga
 */
export function loadTask() {
  return {
    type: LOAD_TASK,
  };
}

/**
 * Dispatched when task is loaded by the request saga
 */
export function taskLoaded(task) {
  return {
    type: LOAD_TASK_SUCCESS,
    task,
  };
}

/**
 * Dispached when loading the task fails
 */
export function taskLoadingError(error) {
  return {
    type: LOAD_TASK_ERROR,
    error,
  };
}
