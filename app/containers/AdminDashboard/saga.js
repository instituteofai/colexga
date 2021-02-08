import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

import request from 'utils/request';

import {
  createTestError,
  createTestSuccess,
  deleteTestError,
  deleteTestSuccess,
  testsLoaded,
  testsLoadingError,
  updateTestActiveError,
  updateTestActiveSuccess,
} from './actions';
import {
  CREATE_TEST,
  DELETE_TEST,
  LOAD_TESTS,
  UPDATE_TEST_ACTIVE,
} from './constants';

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

export function* deleteTest({ payload }) {
  const requestURL = `/api/tests/${payload.testId}`;
  try {
    yield call(request, requestURL, {
      method: 'DELETE',
    });
    yield put(deleteTestSuccess(payload.testId));
  } catch (error) {
    yield put(deleteTestError(error));
  }
}

export function* updateTestActive({ payload }) {
  const requestURL = `/api/tests/${payload.testId}`;
  try {
    yield call(request, requestURL, {
      method: 'PUT',
      body: JSON.stringify({ active: payload.activeValue }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    yield put(updateTestActiveSuccess(payload.testId, payload.activeValue));
  } catch (error) {
    yield put(updateTestActiveError(error));
  }
}

// Individual exports for testing
export default function* adminDashboardSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(LOAD_TESTS, getTests);
  yield takeEvery(CREATE_TEST, createTest);
  yield takeEvery(DELETE_TEST, deleteTest);
  yield takeEvery(UPDATE_TEST_ACTIVE, updateTestActive);
}
