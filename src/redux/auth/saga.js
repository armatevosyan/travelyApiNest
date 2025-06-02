import { loginRequest, loginSuccess, loginFailure } from './actions';
import { axiosApiInstance, config } from 'custom-configs';

import { call, put, takeLatest } from 'redux-saga/effects';
import { catchResponseMessages } from 'utils/methods';

const URL = `${config.API_URL}/api`;

function* auth({ payload }) {
  try {
    const response = yield call(() => axiosApiInstance.post(`${URL}/admin/auth/sign-in`, payload));
    if (response?.status === 200) {
      localStorage.setItem('accessToken', response.data.token);
      localStorage.setItem('userData', JSON.stringify(response.data.data));
      window.location.replace('/dashboard/default');

      yield put(loginSuccess(response.data));
    }
  } catch (e) {
    console.log(`Catch for auth, error`, e);
    if (e?.response?.data) {
      yield put(loginFailure(catchResponseMessages(e)));
    }
  }
}

export default function* () {
  yield takeLatest(loginRequest, auth);
}
