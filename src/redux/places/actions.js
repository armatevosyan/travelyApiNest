import { createAction } from 'redux-actions';

export const getPlacesRequest = createAction('GET_PLACES_REQUEST');
export const getPlacesSuccess = createAction('GET_PLACES_SUCCESS');
export const getPlacesFailure = createAction('GET_PLACES_FAILURE');

export const getPlaceRequest = createAction('GET_PLACE_REQUEST');
export const getPlaceSuccess = createAction('GET_PLACE_SUCCESS');
export const getPlaceFailure = createAction('GET_PLACE_FAILURE');

export const approvePlaceRequest = createAction('APPROVE_PLACE_REQUEST');
export const approvePlaceSuccess = createAction('APPROVE_PLACE_SUCCESS');
export const approvePlaceFailure = createAction('APPROVE_PLACE_FAILURE');

export const rejectPlaceRequest = createAction('REJECT_PLACE_REQUEST');
export const rejectPlaceSuccess = createAction('REJECT_PLACE_SUCCESS');
export const rejectPlaceFailure = createAction('REJECT_PLACE_FAILURE');

export const clearPlaceErrors = createAction('CLEAR_PLACE_ERRORS');
export const clearPlaceMessages = createAction('CLEAR_PLACE_MESSAGES');
