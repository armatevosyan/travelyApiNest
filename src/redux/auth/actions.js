import { createAction } from 'redux-actions';

export const loginRequest = createAction('LOGIN_REQUEST');
export const loginSuccess = createAction('LOGIN_SUCCESS');
export const loginFailure = createAction('LOGIN_FAILURE');

export const enterAccountRequest = createAction('ENTER_ACCOUNT_REQUEST');
export const enterAccountSuccess = createAction('ENTER_ACCOUNT_SUCCESS');
export const enterAccountFailure = createAction('ENTER_ACCOUNT_FAILURE');
