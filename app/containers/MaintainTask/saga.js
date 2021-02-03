import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';

import { loadTasksError, loadTasksSuccess } from './actions';
import { LOAD_TASKS } from './constants';

export function* getTasks({ payload }) {
  const requestURL = `/api/tests/${payload.testId}/tasks`;
  try {
    const repsonse = yield call(request, requestURL);
    yield put(loadTasksSuccess(repsonse.tasks));
  } catch (error) {
    yield put(loadTasksError(error));
  }
}

// Individual exports for testing
export default function* maintainTaskSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(LOAD_TASKS, getTasks);
}
