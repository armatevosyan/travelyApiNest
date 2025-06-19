import { axiosApiInstance, config } from 'custom-configs';

import { catchResponseMessages } from 'utils/methods';
import { call, put, takeLatest } from 'redux-saga/effects';
import { findAllSuccess, findAllFailure, findAllRequest } from './actions';

const ADMIN_URL = `${config.API_URL}`;

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

export default function* () {
  yield takeLatest(findAllRequest, findAllUsers);
}
