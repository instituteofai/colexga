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
  DELETE_TEST,
  DELETE_TEST_ERROR,
  DELETE_TEST_SUCCESS,
  UPDATE_TEST_ACTIVE,
  UPDATE_TEST_ACTIVE_ERROR,
  UPDATE_TEST_ACTIVE_SUCCESS,
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

      case DELETE_TEST:
        draft.loading = true;
        break;
      case DELETE_TEST_ERROR:
        draft.loading = false;
        draft.error = true;
        break;
      case DELETE_TEST_SUCCESS:
        draft.loading = false;
        // eslint-disable-next-line no-underscore-dangle
        draft.tests = draft.tests.filter(e => e._id !== action.payload.testId);
        break;

      case UPDATE_TEST_ACTIVE:
        draft.loading = true;
        break;
      case UPDATE_TEST_ACTIVE_ERROR:
        draft.loading = false;
        draft.error = true;
        break;
      case UPDATE_TEST_ACTIVE_SUCCESS:
        draft.loading = false;
        // eslint-disable-next-line no-underscore-dangle
        draft.tests.find(e => e._id === action.payload.testId).active = true;
        break;

      case DEFAULT_ACTION:
        break;
    }
  });

export default adminDashboardReducer;
