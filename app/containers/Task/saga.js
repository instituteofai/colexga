/* eslint-disable no-underscore-dangle */
import { push } from 'connected-react-router';
import { takeLatest, call, put, select } from 'redux-saga/effects';

import request from '../../utils/request';
import { makeSelectTestId, makeSelectTests } from '../Practice/selectors';
import {
  answerSaved,
  answerSavingError,
  taskLoaded,
  taskLoadingError,
  updateTimerValue,
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
    // Initialize Timer value
    console.log('calling action udpate timer: ', task.allowedTimeInSeconds);
    yield put(updateTimerValue(task.allowedTimeInSeconds));
  } catch (error) {
    yield put(taskLoadingError(error));
  }
}

export function* saveAnswer() {
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
    questionType: task.questionType,
    answer: answerText,
    timeLeftInSeconds,
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
    // submission successful, update state
    const notification = 'Your answer has been submitted successfully!';
    yield put(answerSaved(submission, notification));
    // redirect to home
    yield put(push('/'));
  } catch (error) {
    const notification = 'Oops error occured, Please try again!';
    yield put(answerSavingError(error, notification));
  }
}

export default function* watchTaskActions() {
  yield takeLatest(LOAD_TASK, getTask);
  yield takeLatest(SAVE_ANSWER, saveAnswer);
}
