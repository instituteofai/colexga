import { takeLatest, call, put } from 'redux-saga/effects';

// import request from 'utils/request';
import request from '../../utils/request';
import { testsLoaded, testsLoadingError } from './actions';
import { LOAD_TESTS } from './constants';

export function* getTests() {
  const requestURL = `/api/tests`;
  try {
    const tests = yield call(request, requestURL);
    yield put(testsLoaded(tests));
  } catch (error) {
    yield put(testsLoadingError(error));
  }
}

export default function* getTestsData() {
  yield takeLatest(LOAD_TESTS, getTests);
}
