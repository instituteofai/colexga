import { takeLatest, call, put, delay } from 'redux-saga/effects';

import request from '../../utils/request';
import { hideGlobalNotification, updateUser } from './actions';
import { GET_USER, SHOW_GLOBAL_NOTIFICATION } from './constants';

export function* getUser() {
  const requestURL = `/api/auth/login/success`;

  try {
    const user = yield call(request, requestURL);
    yield put(updateUser(user.user));
  } catch (error) {
    yield put(updateUser(false));
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
}
