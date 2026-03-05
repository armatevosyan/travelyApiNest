import { loginRequest, loginSuccess, loginFailure, enterAccountRequest, enterAccountSuccess, enterAccountFailure } from './actions';
import { openSnackbar } from '@/redux/snakbar/reducer';
import { axiosApiInstance, config } from 'custom-configs';
import { APP_DEFAULT_PATH } from 'config';

import { call, put, takeLatest } from 'redux-saga/effects';
import { catchResponseMessages } from 'utils/methods';

const URL = `${config.API_URL}/api`;

const DASHBOARD_PATH = '/dashboard/analytics';

function* auth({ payload: formData }) {
  try {
    const response = yield call(() => axiosApiInstance.post(`${URL}/auth/sign-in`, formData));
    if (response?.status !== 200 && response?.status !== 201) return;

    const data = response.data?.data || response.data;
    const token = data?.token ?? response.data?.token;
    const user = data?.user ?? response.data?.user;

    if (!token) {
      yield put(loginFailure('No token received'));
      return;
    }

    // Normalize role: Nest returns role as { id, name }, app expects role as string (e.g. 'admin')
    const normalizedUser = user && user.role && typeof user.role === 'object' ? { ...user, role: user.role.name } : user || {};

    // Save to localStorage first so after redirect the app can restore auth (AuthGuard, reducer init)
    try {
      localStorage.setItem('accessToken', String(token));
      localStorage.setItem('userData', JSON.stringify(normalizedUser));
    } catch (storageError) {
      console.error('localStorage save failed', storageError);
      yield put(loginFailure('Could not save session'));
      return;
    }

    yield put(loginSuccess({ token, data: normalizedUser }));

    const redirectTo = typeof APP_DEFAULT_PATH === 'string' && APP_DEFAULT_PATH ? APP_DEFAULT_PATH : DASHBOARD_PATH;
    window.location.replace(redirectTo);
  } catch (e) {
    let message = 'Login failed';
    if (e?.response?.data) {
      const msg = catchResponseMessages(e);
      message = Array.isArray(msg) ? msg.join(' ') : msg || message;
    } else if (e?.message) {
      message = e.message;
    }
    yield put(loginFailure(message));
    yield put(
      openSnackbar({
        open: true,
        message,
        variant: 'alert',
        alert: { color: 'error', variant: 'filled' },
        close: true
      })
    );
  }
}

function* enterAccount({ payload }) {
  try {
    const response = yield call(() => axiosApiInstance.post(`${URL}/admin/auth/enter-account/${payload}`, payload));
    if (response?.status === 200) {
      yield put(enterAccountSuccess(response.data));
    }
  } catch (e) {
    console.log(`Catch for auth, error`, e);
    if (e?.response?.data) {
      yield put(enterAccountFailure(catchResponseMessages(e)));
    }
  }
}

export default function* () {
  yield takeLatest(loginRequest, auth);
  yield takeLatest(enterAccountRequest, enterAccount);
}
