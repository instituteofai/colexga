/* eslint-disable no-underscore-dangle */
import { takeEvery, put, call, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import request from 'utils/request';
import { makeSelectLocation } from 'containers/App/selectors';

import {
  ADD_TASK,
  ADD_TASK_SUCCESS,
  LOAD_TASK,
  UPDATE_TASK,
} from './constants';
import {
  addTaskError,
  addTaskSuccess,
  loadTaskSuccess,
  loadTaskError,
  updateTaskError,
  updateTaskSuccess,
} from './actions';

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

export function* loadTask({ payload }) {
  const { testId, taskId } = payload;
  const requestURL = `/api/tests/${testId}/tasks`;
  try {
    const response = yield call(request, requestURL);
    const task = response.tasks.find(e => e._id === taskId);
    yield put(loadTaskSuccess(task));
  } catch (error) {
    yield put(loadTaskError(error));
  }
}

export function* updateTask({ payload }) {
  const { testId, taskId, task } = payload;
  const requestURL = `/api/tests/${testId}/tasks/${taskId}`;
  try {
    const response = yield call(request, requestURL, {
      method: 'PUT',
      body: JSON.stringify(task),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    yield put(updateTaskSuccess(response));
  } catch (error) {
    yield put(updateTaskError(error));
  }
}

// Individual exports for testing
export default function* taskDetailsSaga() {
  // See example in containers/HomePage/saga.js
  yield takeEvery(ADD_TASK, addTask);
  yield takeEvery(ADD_TASK_SUCCESS, addTaskSuccessRoute);
  yield takeEvery(LOAD_TASK, loadTask);
  yield takeEvery(UPDATE_TASK, updateTask);
}
