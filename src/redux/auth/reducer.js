import { handleActions } from 'redux-actions';
import { loginFailure, loginRequest, loginSuccess } from './actions';

const initialState = {
  isUserLoggingIn: false,
  isUserLoggedInSuccess: false,
  isUserLoggedInFailure: false,
  user: JSON.parse(localStorage.getItem('userData') || JSON.stringify({})) || {},
  errorMessage: '',
  successMessage: '',
  isLoggingOut: false,
  userData: JSON.parse(localStorage.getItem('userData') || JSON.stringify({})) || {}
};

const reducer = handleActions(
  {
    [loginRequest]: (state) => ({
      ...state,
      isUserLoggingIn: true,
      isUserLoggedInSuccess: false,
      isUserLoggedInFailure: false
    }),
    [loginSuccess]: (state, { payload }) => ({
      ...state,
      user: payload.user,
      isUserLoggingIn: false,
      isUserLoggedInSuccess: true,
      successMessage: payload.message
    }),
    [loginFailure]: (state, { payload }) => ({
      ...state,
      isUserLoggingIn: false,
      isUserLoggedInFailure: true,
      errorMessage: payload
    })
  },
  initialState
);
export default reducer;
