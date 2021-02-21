import { takeLatest, call, put } from 'redux-saga/effects';

import request from '../../utils/request';
import { updateUser } from './actions';
import { GET_USER } from './constants';

export function* getUser() {
  const requestURL = `/api/auth/login/success`;

  try {
    const user = yield call(request, requestURL);
    yield put(updateUser(user.user));
  } catch (error) {
    yield put(updateUser(false));
  }
}

export default function* updateUserData() {
  yield takeLatest(GET_USER, getUser);
}
