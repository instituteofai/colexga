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
  CREATE_TEST,
  CREATE_TEST_SUCCESS,
  CREATE_TEST_ERROR,
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

export function createTest(testName) {
  return {
    type: CREATE_TEST,
    payload: { testName },
  };
}

export function createTestSuccess(test) {
  return {
    type: CREATE_TEST_SUCCESS,
    payload: { test },
  };
}

export function createTestError(error) {
  return {
    type: CREATE_TEST_ERROR,
    payload: { error },
  };
}
