import { handleActions } from 'redux-actions';
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
  rejectPlaceFailure,
  clearPlaceErrors,
  clearPlaceMessages
} from './actions';

const initialState = {
  loading: false,
  loadingSingle: false,
  loadingAction: false,
  error: false,
  errorMessage: '',
  success: false,
  successMessage: '',
  places: [],
  total: 0,
  singlePlace: null,
  filters: {
    status: '',
    search: '',
    categoryIds: '',
    page: 0,
    limit: 10
  }
};

const reducer = handleActions(
  {
    [getPlacesRequest]: (state) => ({
      ...state,
      loading: true,
      error: false,
      errorMessage: '',
      success: false,
      successMessage: ''
    }),
    [getPlacesSuccess]: (state, { payload }) => ({
      ...state,
      loading: false,
      places: payload.data || [],
      total: payload.total ?? payload.data?.length ?? 0,
      successMessage: payload.message || 'Places fetched successfully'
    }),
    [getPlacesFailure]: (state, { payload }) => ({
      ...state,
      loading: false,
      error: true,
      errorMessage: payload?.message || payload || 'Failed to fetch places'
    }),

    [getPlaceRequest]: (state) => ({
      ...state,
      loadingSingle: true
    }),
    [getPlaceSuccess]: (state, { payload }) => ({
      ...state,
      loadingSingle: false,
      singlePlace: payload.data || payload
    }),
    [getPlaceFailure]: (state, { payload }) => ({
      ...state,
      loadingSingle: false,
      error: true,
      errorMessage: payload?.message || payload || 'Failed to fetch place'
    }),

    [approvePlaceRequest]: (state) => ({
      ...state,
      loadingAction: true,
      error: false,
      success: false
    }),
    [approvePlaceSuccess]: (state, { payload }) => ({
      ...state,
      loadingAction: false,
      success: true,
      successMessage: payload.message || 'Place approved successfully',
      places: state.places.map((p) => (p.id === payload.data?.id ? { ...p, ...payload.data } : p))
    }),
    [approvePlaceFailure]: (state, { payload }) => ({
      ...state,
      loadingAction: false,
      error: true,
      errorMessage: payload?.message || payload || 'Failed to approve place'
    }),

    [rejectPlaceRequest]: (state) => ({
      ...state,
      loadingAction: true,
      error: false,
      success: false
    }),
    [rejectPlaceSuccess]: (state, { payload }) => ({
      ...state,
      loadingAction: false,
      success: true,
      successMessage: payload.message || 'Place rejected successfully',
      places: state.places.map((p) => (p.id === payload.data?.id ? { ...p, ...payload.data } : p))
    }),
    [rejectPlaceFailure]: (state, { payload }) => ({
      ...state,
      loadingAction: false,
      error: true,
      errorMessage: payload?.message || payload || 'Failed to reject place'
    }),

    [clearPlaceErrors]: (state) => ({
      ...state,
      error: false,
      errorMessage: ''
    }),
    [clearPlaceMessages]: (state) => ({
      ...state,
      success: false,
      successMessage: ''
    })
  },
  initialState
);

export default reducer;
