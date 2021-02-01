/*
 *
 * AdminDashboard reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  LOAD_TESTS,
  LOAD_TESTS_SUCCESS,
  LOAD_TESTS_ERROR,
  CREATE_TEST,
  CREATE_TEST_ERROR,
  CREATE_TEST_SUCCESS,
} from './constants';

export const initialState = {
  loading: false,
  error: false,
  tests: [],
};

/* eslint-disable default-case, no-param-reassign */
const adminDashboardReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_TESTS:
        draft.loading = true;
        break;
      case LOAD_TESTS_SUCCESS:
        draft.tests = action.payload.tests;
        draft.loading = false;
        break;
      case LOAD_TESTS_ERROR:
        draft.loading = false;
        draft.error = true;
        break;
      case CREATE_TEST:
        draft.loading = true;
        break;
      case CREATE_TEST_ERROR:
        draft.loading = false;
        draft.error = true;
        break;
      case CREATE_TEST_SUCCESS:
        draft.loading = false;
        draft.tests.push(action.payload.test);
        break;
      case DEFAULT_ACTION:
        break;
    }
  });

export default adminDashboardReducer;
