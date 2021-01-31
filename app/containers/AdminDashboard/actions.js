/*
 *
 * AdminDashboard actions
 *
 */

import {
  DEFAULT_ACTION,
  LOAD_TESTS,
  LOAD_TESTS_SUCCESS,
  LOAD_TESTS_ERROR,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function loadTests() {
  return {
    type: LOAD_TESTS,
  };
}

export function testsLoaded(tests) {
  return {
    type: LOAD_TESTS_SUCCESS,
    payload: { tests },
  };
}

export function testsLoadingError(error) {
  return {
    type: LOAD_TESTS_ERROR,
    payload: { error },
  };
}
