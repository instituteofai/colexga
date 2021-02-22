/* eslint-disable no-underscore-dangle */
import { push } from 'connected-react-router';
import { takeLatest, call, put, select } from 'redux-saga/effects';

import request from '../../utils/request';
import { updateGlobalNotification } from '../App/actions';
import { notificationType } from '../App/constants';
import { makeSelectUser } from '../App/selectors';
import { makeSelectTestId, makeSelectTests } from '../Practice/selectors';
import {
  answerSaved,
  answerSavingError,
  reset,
  taskLoaded,
  taskLoadingError,
} from './actions';
import { LOAD_TASK, SAVE_ANSWER } from './constants';
import makeSelectTask, {
  makeSelectAnswer,
  makeSelectTimerValue,
} from './selectors';

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

export function* saveAnswer() {
  const user = yield select(makeSelectUser());
  const testId = yield select(makeSelectTestId());
  const task = yield select(makeSelectTask());
  const tests = yield select(makeSelectTests());
  const answerText = yield select(makeSelectAnswer());
  const test = tests.tests.find(elem => elem._id === testId);
  const timeLeftInSeconds = yield select(makeSelectTimerValue());
  const requestURL = `/api/submissions`;
  const payload = {
    taskId: task._id,
    question: task.question,
    answer: answerText,
    timeLeftInSeconds,
    score: 4.2,
    createdOn: new Date(),
    testId: task._id,
    testName: test.name,
    userId: user._id,
    email: user.email,
    lastModified: new Date(),
    isEvaluated: false,
  };
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  };

  try {
    yield call(request, requestURL, options); // return new submission document
    // submission successful, update state
    const notification = {
      type: notificationType.SUCCESS,
      message: 'Your submission was successful!',
    };
    yield put(updateGlobalNotification(notification));
    // Reset Task state
    yield put(reset());
    // redirect to home
    yield put(push('/'));
  } catch (error) {
    const notification = {
      type: notificationType.ERROR,
      message: 'Oops error occured, Please try again!',
    };
    yield put(answerSavingError(error, notification));
  }
}

export default function* watchTaskActions() {
  yield takeLatest(LOAD_TASK, getTask);
  yield takeLatest(SAVE_ANSWER, saveAnswer);
}
