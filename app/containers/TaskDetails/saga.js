import { takeEvery, put, call, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import request from 'utils/request';
import { makeSelectLocation } from 'containers/App/selectors';

import { ADD_TASK, ADD_TASK_SUCCESS } from './constants';
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

export function* addTaskSuccessRoute({ payload }) {
  const { _id: taskId } = payload.task;

  // Get the current location in the redux state
  // and replace "new" with the task ID
  const { pathname } = yield select(makeSelectLocation());
  const newUrl = pathname.replace('new', taskId);
  yield put(push(newUrl));
}

// Individual exports for testing
export default function* taskDetailsSaga() {
  // See example in containers/HomePage/saga.js
  yield takeEvery(ADD_TASK, addTask);
  yield takeEvery(ADD_TASK_SUCCESS, addTaskSuccessRoute);
}
