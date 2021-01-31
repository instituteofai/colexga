/*
 *
 * Task actions
 *
 */

import {
  LOAD_TASK,
  LOAD_TASK_SUCCESS,
  LOAD_TASK_ERROR,
  SAVE_ANSWER,
  SAVE_ANSWER_SUCCESS,
  SAVE_ANSWER_ERROR,
} from './constants';

// TASK
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

// ANSWER
export function saveAnswer(answer) {
  return {
    type: SAVE_ANSWER,
    answer,
  };
}

export function answerSaved(submission) {
  return {
    type: SAVE_ANSWER_SUCCESS,
    submission,
  };
}

export function answerSavingError(error) {
  return {
    type: SAVE_ANSWER_ERROR,
    error,
  };
}
