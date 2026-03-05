import { handleActions } from 'redux-actions';
import {
  findAllSuccess,
  findAllFailure,
  findAllRequest,
  deactivateUserSuccess,
  deactivateUserFailure,
  deactivateUserRequest,
  activateUserSuccess,
  activateUserFailure,
  activateUserRequest,
  clearUserMessages
} from './actions';

const initialState = {
  findAll: false,
  findAllSuccess: false,
  findAllFailure: false,
  usersList: [],
  usersCount: 0,
  success: false,
  successMessage: null,
  error: false,
  errorMessage: null
};

const reducer = handleActions(
  {
    [findAllRequest]: (state) => ({
      ...state,
      isCreatingUser: true,
      isCreatedUserFailure: false,
      isCreatedUserSuccess: false
    }),
    [findAllSuccess]: (state, { payload }) => ({
      ...state,
      isCreatingUser: false,
      isCreatedUserSuccess: true,
      successMessage: payload.message,
      usersList: payload.data,
      usersCount: payload.total
    }),
    [findAllFailure]: (state, { payload }) => ({
      ...state,
      isCreatingUser: false,
      isCreatedUserFailure: true,
      errorMessage: payload
    }),
    [deactivateUserRequest]: (state) => ({ ...state, error: false, errorMessage: null }),
    [deactivateUserSuccess]: (state, { payload }) => ({
      ...state,
      success: true,
      successMessage: payload?.message || 'User deactivated successfully'
    }),
    [deactivateUserFailure]: (state, { payload }) => ({
      ...state,
      error: true,
      errorMessage: payload
    }),
    [activateUserRequest]: (state) => ({ ...state, error: false, errorMessage: null }),
    [activateUserSuccess]: (state, { payload }) => ({
      ...state,
      success: true,
      successMessage: payload?.message || 'User activated successfully'
    }),
    [activateUserFailure]: (state, { payload }) => ({
      ...state,
      error: true,
      errorMessage: payload
    }),
    [clearUserMessages]: (state) => ({
      ...state,
      success: false,
      successMessage: null,
      error: false,
      errorMessage: null
    })
  },
  initialState
);
export default reducer;
