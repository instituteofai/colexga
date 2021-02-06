/*
 *
 * Task reducer
 *
 */
import produce from 'immer';
import {
  LOAD_TASK,
  LOAD_TASK_ERROR,
  LOAD_TASK_SUCCESS,
  RESET,
  SAVE_ANSWER,
  SAVE_ANSWER_ERROR,
  SAVE_ANSWER_SUCCESS,
  UPDATE_ANSWER,
  UPDATE_TIMER_VALUE,
} from './constants';

export const initialState = {
  loading: false,
  error: false,
  task: false,
  answerText: '',
  submission: false,
  answerNotification: false,
  answerError: false,
  timerValueInSeconds: 0,
};

/* eslint-disable default-case, no-param-reassign */
const taskReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_TASK:
        draft.loading = true;
        draft.error = false;
        draft.task = false;
        break;
      case LOAD_TASK_SUCCESS:
        draft.task = action.task;
        draft.loading = false;
        break;
      case LOAD_TASK_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;

      case UPDATE_ANSWER:
        draft.answerText = action.answerText;
        break;
      case SAVE_ANSWER:
        break;
      case SAVE_ANSWER_SUCCESS:
        draft.submission = action.submission;
        draft.answerNotification = action.notification;
        break;
      case SAVE_ANSWER_ERROR:
        draft.answerNotification = action.notification;
        draft.answerError = action.error;
        break;

      case UPDATE_TIMER_VALUE:
        draft.timerValueInSeconds = action.seconds;
        break;

      case RESET:
        draft = initialState;
        break;
    }
  });

export default taskReducer;
