import { handleActions } from 'redux-actions';
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  meRequest,
  meSuccess,
  meFailure,
  enterAccountRequest,
  enterAccountSuccess,
  enterAccountFailure
} from './actions';

const initialState = {
  isUserLoggingIn: false,
  isUserLoggedInSuccess: false,
  isUserLoggedInFailure: false,
  isMe: false,
  isMeSuccess: false,
  isMeFailure: false,
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
      user: payload.data,
      isUserLoggingIn: false,
      isUserLoggedInSuccess: true,
      successMessage: payload.message
    }),
    [loginFailure]: (state, { payload }) => ({
      ...state,
      isUserLoggingIn: false,
      isUserLoggedInFailure: true,
      errorMessage: payload
    }),
    [meRequest]: (state) => ({
      ...state,
      isMe: true,
      isMeSuccess: false,
      isMeFailure: false
    }),
    [meSuccess]: (state, { payload }) => ({
      ...state,
      user: payload.data,
      isMe: false,
      isMeSuccess: true,
      successMessage: payload.message
    }),
    [meFailure]: (state, { payload }) => ({
      ...state,
      isMe: false,
      isMeFailure: true,
      errorMessage: payload
    }),
    [enterAccountRequest]: (state) => ({
      ...state,
      isUserLoggingIn: true,
      isUserLoggedInSuccess: false,
      isUserLoggedInFailure: false
    }),
    [enterAccountSuccess]: (state, { payload }) => ({
      ...state,
      user: payload.data,
      isUserLoggingIn: false,
      isUserLoggedInSuccess: (() => {
        const currentUserToken = localStorage.getItem('accessToken');
        const currentUserData = localStorage.getItem('userData');
        localStorage.setItem(`${state.user?.role}-token`, currentUserToken);
        localStorage.setItem(`${state.user?.role}-user-data`, currentUserData);

        localStorage.setItem('accessToken', payload.token);
        localStorage.setItem('userData', JSON.stringify(payload.data));
        window.location.reload();

        return true;
      })(),
      successMessage: payload.message
    }),
    [enterAccountFailure]: (state, { payload }) => ({
      ...state,
      isUserLoggingIn: false,
      isUserLoggedInFailure: true,
      errorMessage: payload
    })
  },
  initialState
);
export default reducer;
