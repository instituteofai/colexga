import { takeLatest, call, put, select } from 'redux-saga/effects';

import request from '../../utils/request';
import { makeSelectTestId } from '../Practice/selectors';
import { taskLoaded, taskLoadingError } from './actions';
import { LOAD_TASK } from './constants';

export function* getTask() {
  // Select testId from store
  const testId = yield select(makeSelectTestId());
  const requestURL = `/api/tests/${testId}/tasks`;
  try {
    const tasks = yield call(request, requestURL);
    // TODO: Select and return a task which is not attempted by the user yet
    // Select a random one for now
    const randomIdx = Math.floor(Math.random() * tasks.tasks.length);
    const task = tasks.tasks[randomIdx];
    yield put(taskLoaded(task));
  } catch (error) {
    yield put(taskLoadingError(error));
  }
}

export default function* getTaskData() {
  yield takeLatest(LOAD_TASK, getTask);
}
