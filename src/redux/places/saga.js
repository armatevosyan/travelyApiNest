import { axiosApiInstance, config } from 'custom-configs';
import { catchResponseMessages } from 'utils/methods';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
  getPlacesRequest,
  getPlacesSuccess,
  getPlacesFailure,
  getPlaceRequest,
  getPlaceSuccess,
  getPlaceFailure,
  approvePlaceRequest,
  approvePlaceSuccess,
  approvePlaceFailure,
  rejectPlaceRequest,
  rejectPlaceSuccess,
  rejectPlaceFailure
} from './actions';

const ADMIN_URL = `${config.API_URL}/api`;

function* getPlaces({ payload }) {
  try {
    const params = payload?.filters ?? payload ?? {};
    const response = yield call(() => axiosApiInstance.get(`${ADMIN_URL}/admin/places`, { params }));
    if (response?.status === 200) {
      const data = response.data?.data ?? response.data ?? [];
      const total = response.data?.total ?? response.data?.pagination?.total ?? data.length;
      yield put(
        getPlacesSuccess({
          data,
          total,
          message: response.data?.message || 'Places fetched successfully'
        })
      );
    }
  } catch (e) {
    console.log('Error in getPlaces:', e);
    yield put(getPlacesFailure(e?.response?.data ? catchResponseMessages(e) : 'Failed to fetch places'));
  }
}

function* getPlace({ payload }) {
  try {
    const { id } = payload || {};
    const response = yield call(() => axiosApiInstance.get(`${ADMIN_URL}/admin/places/${id}`));
    if (response?.status === 200) {
      yield put(
        getPlaceSuccess({
          data: response.data?.data ?? response.data,
          message: response.data?.message || 'Place fetched successfully'
        })
      );
    }
  } catch (e) {
    console.log('Error in getPlace:', e);
    yield put(getPlaceFailure(e?.response?.data ? catchResponseMessages(e) : 'Failed to fetch place'));
  }
}

function* approvePlace({ payload }) {
  try {
    const { id } = payload || {};
    const response = yield call(() => axiosApiInstance.patch(`${ADMIN_URL}/admin/places/${id}/approve`));
    if (response?.status === 200) {
      yield put(
        approvePlaceSuccess({
          data: response.data?.data ?? response.data,
          message: response.data?.message || 'Place approved successfully'
        })
      );
    }
  } catch (e) {
    console.log('Error in approvePlace:', e);
    yield put(approvePlaceFailure(e?.response?.data ? catchResponseMessages(e) : 'Failed to approve place'));
  }
}

function* rejectPlace({ payload }) {
  try {
    const { id, reason } = payload || {};
    const response = yield call(() => axiosApiInstance.patch(`${ADMIN_URL}/admin/places/${id}/reject`, { reason }));
    if (response?.status === 200) {
      yield put(
        rejectPlaceSuccess({
          data: response.data?.data ?? response.data,
          message: response.data?.message || 'Place rejected successfully'
        })
      );
    }
  } catch (e) {
    console.log('Error in rejectPlace:', e);
    yield put(rejectPlaceFailure(e?.response?.data ? catchResponseMessages(e) : 'Failed to reject place'));
  }
}

export default function* placesSaga() {
  yield takeLatest(getPlacesRequest, getPlaces);
  yield takeLatest(getPlaceRequest, getPlace);
  yield takeLatest(approvePlaceRequest, approvePlace);
  yield takeLatest(rejectPlaceRequest, rejectPlace);
}
