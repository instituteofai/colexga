/*
 *
 * Practice actions
 *
 */

import { LOAD_TESTS, LOAD_TESTS_SUCCESS, LOAD_TESTS_ERROR } from './constants';

export function loadTests() {
  return {
    type: LOAD_TESTS,
  };
}

export function testsLoaded(tests) {
  return {
    type: LOAD_TESTS_SUCCESS,
    tests,
  };
}

export function testsLoadingError(error) {
  return {
    type: LOAD_TESTS_ERROR,
    error,
  };
}
