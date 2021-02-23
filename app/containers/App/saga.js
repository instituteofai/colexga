/* eslint-disable no-underscore-dangle */
import { takeLatest, call, put, delay, select } from 'redux-saga/effects';

import request from '../../utils/request';
import {
  hideGlobalNotification,
  updateUser,
  loadSubmissions,
  getUserSubmissions,
} from './actions';
import {
  GET_USER,
  SHOW_GLOBAL_NOTIFICATION,
  FETCH_USER_SUBMISSIONS,
} from './constants';
import { makeSelectUser } from './selectors';

export function* getUser() {
  const loginURL = `/api/auth/login/success`;

  try {
    const user = yield call(request, loginURL);
    yield put(updateUser(user.user));
    // Load user's submissions as well
    yield put(getUserSubmissions(user.user._id));
  } catch (error) {
    yield put(updateUser(false));
  }
}

export function* fetchUserSubmissions() {
  const user = yield select(makeSelectUser());
  const userSubmissionsURL = `/api/submissions/${user._id}`;
  try {
    const userSubmissions = yield call(request, userSubmissionsURL);
    yield put(loadSubmissions(userSubmissions.submissions));
  } catch (error) {
    yield put(loadSubmissions(false));
  }
}

export function* hideGlobNotification() {
  // Wait for 5 seconds, Then reset notification message
  yield delay(5000);
  yield put(hideGlobalNotification({ type: false, message: false }));
}

export default function* watchActions() {
  yield takeLatest(GET_USER, getUser);
  yield takeLatest(SHOW_GLOBAL_NOTIFICATION, hideGlobNotification);
  yield takeLatest(FETCH_USER_SUBMISSIONS, fetchUserSubmissions);
}
