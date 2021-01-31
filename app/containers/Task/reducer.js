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
  SAVE_ANSWER,
  SAVE_ANSWER_ERROR,
  SAVE_ANSWER_SUCCESS,
} from './constants';

export const initialState = {
  loading: false,
  error: false,
  task: false,
  answer: false,
  answerNotification: false,
  answerError: false,
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

      case SAVE_ANSWER:
        draft.answer = action.answer;
        break;
      case SAVE_ANSWER_SUCCESS:
        draft.answerNotification = action.notification;
        break;
      case SAVE_ANSWER_ERROR:
        draft.answerNotification = action.notification;
        draft.answerError = action.error;
        break;
    }
  });

export default taskReducer;
