import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

import request from 'utils/request';

import {
  createTestError,
  createTestSuccess,
  testsLoaded,
  testsLoadingError,
} from './actions';
import { CREATE_TEST, LOAD_TESTS } from './constants';

export function* getTests() {
  const requestURL = `/api/tests`;
  try {
    const response = yield call(request, requestURL);
    yield put(testsLoaded(response.tests));
  } catch (error) {
    yield put(testsLoadingError(error));
  }
}

export function* createTest({ payload }) {
  const requestURL = `/api/tests`;
  try {
    const response = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify({ name: payload.testName }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    yield put(createTestSuccess(response));
  } catch (error) {
    yield put(createTestError(error));
  }
}

// Individual exports for testing
export default function* adminDashboardSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(LOAD_TESTS, getTests);
  yield takeEvery(CREATE_TEST, createTest);
}
