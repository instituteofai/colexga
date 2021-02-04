import { takeEvery, put, call } from 'redux-saga/effects';

import request from 'utils/request';

import { ADD_TASK } from './constants';
import { addTaskError, addTaskSuccess } from './actions';

export function* addTask({ payload }) {
  const requestURL = `/api/tests/${payload.testId}/tasks`;
  try {
    const response = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(payload.task),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    yield put(addTaskSuccess(response));
  } catch (error) {
    yield put(addTaskError(error));
  }
}

// Individual exports for testing
export default function* taskDetailsSaga() {
  // See example in containers/HomePage/saga.js
  yield takeEvery(ADD_TASK, addTask);
}
