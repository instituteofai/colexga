import { call, put, takeLatest } from 'redux-saga/effects';

import request from 'utils/request';

import { testsLoaded, testsLoadingError } from './actions';
import { LOAD_TESTS } from './constants';

export function* getTests() {
  const requestURL = `/api/tests`;
  try {
    const response = yield call(request, requestURL);
    yield put(testsLoaded(response.tests));
  } catch (error) {
    yield put(testsLoadingError(error));
  }
}

// Individual exports for testing
export default function* adminDashboardSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(LOAD_TESTS, getTests);
}
