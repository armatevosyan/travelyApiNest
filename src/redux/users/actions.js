import { createAction } from 'redux-actions';

export const findAllRequest = createAction('FIND_ALL_REQUEST');
export const findAllSuccess = createAction('FIND_ALL_SUCCESS');
export const findAllFailure = createAction('FIND_ALL_FAILURE');
