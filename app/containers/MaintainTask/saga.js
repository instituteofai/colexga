import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';

import {
  loadTasksError,
  loadTasksSuccess,
  deleteTaskSuccess,
  deleteTaskError,
} from './actions';
import { LOAD_TASKS, DELETE_TASK } from './constants';

export function* getTasks({ payload }) {
  const requestURL = `/api/tests/${payload.testId}/tasks`;
  try {
    const repsonse = yield call(request, requestURL);
    yield put(loadTasksSuccess(repsonse.tasks));
  } catch (error) {
    yield put(loadTasksError(error));
  }
}

export function* deleteTask({ payload }) {
  const { testId, taskId } = payload;
  const requestURL = `/api/tests/${testId}/tasks/${taskId}`;
  try {
    yield call(request, requestURL, {
      method: 'DELETE',
    });
    yield put(deleteTaskSuccess(testId, taskId));
  } catch (error) {
    yield put(deleteTaskError(error));
  }
}

export default function* maintainTaskSaga() {
  yield takeLatest(LOAD_TASKS, getTasks);
  yield takeLatest(DELETE_TASK, deleteTask);
}
