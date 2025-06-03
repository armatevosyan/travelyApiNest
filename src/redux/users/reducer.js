import { handleActions } from 'redux-actions';
import { findAllSuccess, findAllFailure, findAllRequest } from './actions';

const initialState = {
  findAll: false,
  findAllSuccess: false,
  findAllFailure: false,
  usersList: [],
  usersCount: 0
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
    })
  },
  initialState
);
export default reducer;
