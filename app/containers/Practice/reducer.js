/*
 *
 * Practice reducer
 *
 */
import produce from 'immer';
import { LOAD_TESTS, LOAD_TESTS_SUCCESS, LOAD_TESTS_ERROR } from './constants';

export const initialState = {
  loading: false,
  error: false,
  tests: false,
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
    }
  });

export default practiceReducer;
