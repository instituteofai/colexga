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
  UPDATE_TIMER_VALUE,
  RESET,
  UPDATE_ANSWER,
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
export function updateAnswer(answerText) {
  return {
    type: UPDATE_ANSWER,
    answerText,
  };
}

export function saveAnswer() {
  return {
    type: SAVE_ANSWER,
  };
}

export function answerSaved(submission, notification) {
  return {
    type: SAVE_ANSWER_SUCCESS,
    submission,
    notification,
  };
}

export function answerSavingError(error, notification) {
  return {
    type: SAVE_ANSWER_ERROR,
    error,
    notification,
  };
}

// Timer
export function updateTimerValue(seconds) {
  return {
    type: UPDATE_TIMER_VALUE,
    seconds,
  };
}

// Reset State
export function reset() {
  return {
    type: RESET,
  };
}
