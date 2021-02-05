/* eslint-disable no-underscore-dangle */
import { takeLatest, call, put, select } from 'redux-saga/effects';

import request from '../../utils/request';
import { makeSelectTestId, makeSelectTests } from '../Practice/selectors';
import {
  answerSaved,
  answerSavingError,
  taskLoaded,
  taskLoadingError,
} from './actions';
import { LOAD_TASK, SAVE_ANSWER } from './constants';
import makeSelectTask, { makeSelectTimerValue } from './selectors';

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

export function* saveAnswer(answer) {
  const testId = yield select(makeSelectTestId());
  const task = yield select(makeSelectTask());
  const tests = yield select(makeSelectTests());
  const test = tests.tests.find(elem => elem._id === testId);
  const timeTakenInSeconds = yield select(makeSelectTimerValue());
  const requestURL = `/api/submissions`;
  const payload = {
    taskId: task._id,
    question: task.question,
    questionType: task.questionType,
    answer: answer.answer,
    timeTakenInSeconds,
    score: '8.2',
    createdOn: new Date(),
    testId: task._id,
    testName: test.name,
    userId: task._id, // TODO: Change
    username: 'Chandan Kumar', // TODO: Change
    lastModified: new Date(),
    isEvaluated: true,
  };
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  };

  try {
    const submission = yield call(request, requestURL, options);
    yield put(answerSaved(submission));
  } catch (error) {
    yield put(answerSavingError(error));
  }
}

export default function* watchTaskActions() {
  yield takeLatest(LOAD_TASK, getTask);
  yield takeLatest(SAVE_ANSWER, saveAnswer);
}
