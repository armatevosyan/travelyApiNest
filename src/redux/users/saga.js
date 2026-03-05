import { axiosApiInstance, config } from 'custom-configs';

import { catchResponseMessages } from 'utils/methods';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
  findAllSuccess,
  findAllFailure,
  findAllRequest,
  deactivateUserRequest,
  deactivateUserSuccess,
  deactivateUserFailure,
  activateUserRequest,
  activateUserSuccess,
  activateUserFailure
} from './actions';

const ADMIN_URL = `${config.API_URL}/api`;

function* findAllUsers({ payload }) {
  try {
    const response = yield call(() => axiosApiInstance.get(`${ADMIN_URL}/admin/users`, { params: payload }));
    if (response?.status === 200) {
      yield put(findAllSuccess(response.data));
    }
  } catch (e) {
    console.log(`Catch for createUser, error`, e);
    if (e?.response?.data) {
      yield put(findAllFailure(catchResponseMessages(e)));
    }
  }
}

function* deactivateUser({ payload }) {
  try {
    const { id, reason } = payload || {};
    const response = yield call(() =>
      axiosApiInstance.patch(`${ADMIN_URL}/admin/users/${id}/deactivate`, { reason: reason || undefined })
    );
    if (response?.status === 200) {
      yield put(deactivateUserSuccess({ message: response.data?.message || 'User deactivated successfully' }));
    }
  } catch (e) {
    if (e?.response?.data) {
      yield put(deactivateUserFailure(catchResponseMessages(e)));
    } else {
      yield put(deactivateUserFailure('Failed to deactivate user'));
    }
  }
}

function* activateUser({ payload }) {
  try {
    const { id } = payload || {};
    const response = yield call(() => axiosApiInstance.patch(`${ADMIN_URL}/admin/users/${id}/activate`));
    if (response?.status === 200) {
      yield put(activateUserSuccess({ message: response.data?.message || 'User activated successfully' }));
    }
  } catch (e) {
    if (e?.response?.data) {
      yield put(activateUserFailure(catchResponseMessages(e)));
    } else {
      yield put(activateUserFailure('Failed to activate user'));
    }
  }
}

export default function* () {
  yield takeLatest(findAllRequest, findAllUsers);
  yield takeLatest(deactivateUserRequest, deactivateUser);
  yield takeLatest(activateUserRequest, activateUser);
}
