import { createAction } from 'redux-actions';

export const findAllRequest = createAction('FIND_ALL_REQUEST');
export const findAllSuccess = createAction('FIND_ALL_SUCCESS');
export const findAllFailure = createAction('FIND_ALL_FAILURE');

export const deactivateUserRequest = createAction('DEACTIVATE_USER_REQUEST');
export const deactivateUserSuccess = createAction('DEACTIVATE_USER_SUCCESS');
export const deactivateUserFailure = createAction('DEACTIVATE_USER_FAILURE');

export const activateUserRequest = createAction('ACTIVATE_USER_REQUEST');
export const activateUserSuccess = createAction('ACTIVATE_USER_SUCCESS');
export const activateUserFailure = createAction('ACTIVATE_USER_FAILURE');

export const clearUserMessages = createAction('CLEAR_USER_MESSAGES');
