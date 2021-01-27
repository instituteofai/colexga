/*
 *
 * Practice reducer
 *
 */
import produce from 'immer';
import {
  LOAD_TESTS,
  LOAD_TESTS_SUCCESS,
  LOAD_TESTS_ERROR,
  SELECT_TEST,
} from './constants';

export const initialState = {
  loading: false,
  error: false,
  tests: false,
  testId: false,
};

/* eslint-disable default-case, no-param-reassign */
const practiceReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_TESTS:
        draft.loading = true;
        draft.error = false;
        draft.tests = false;
        break;
      case LOAD_TESTS_SUCCESS:
        draft.tests = action.tests;
        draft.loading = false;
        break;
      case LOAD_TESTS_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
      case SELECT_TEST:
        draft.testId = action.testId;
        break;
    }
  });

export default practiceReducer;
