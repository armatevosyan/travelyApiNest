import { handleActions } from 'redux-actions';
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  enterAccountRequest,
  enterAccountSuccess,
  enterAccountFailure,
  logoutSuccess
} from './actions';

function parseUserFromStorage() {
  try {
    const raw = JSON.parse(localStorage.getItem('userData') || '{}');
    if (raw && raw.role && typeof raw.role === 'object' && raw.role.name) {
      return { ...raw, role: raw.role.name };
    }
    return raw || {};
  } catch {
    return {};
  }
}

const initialState = {
  isUserLoggingIn: false,
  isUserLoggedInSuccess: false,
  isUserLoggedInFailure: false,
  user: parseUserFromStorage(),
  errorMessage: '',
  successMessage: '',
  isLoggingOut: false,
  userData: parseUserFromStorage()
};

const reducer = handleActions(
  {
    [loginRequest]: (state) => ({
      ...state,
      isUserLoggingIn: true,
      isUserLoggedInSuccess: false,
      isUserLoggedInFailure: false,
      errorMessage: ''
    }),
    [loginSuccess]: (state, { payload }) => ({
      ...state,
      user: payload.data || state.user,
      userData: payload.data || state.userData,
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
    }),
    [logoutSuccess]: () => ({
      isUserLoggingIn: false,
      isUserLoggedInSuccess: false,
      isUserLoggedInFailure: false,
      user: {},
      userData: {},
      errorMessage: '',
      successMessage: '',
      isLoggingOut: false
    })
  },
  initialState
);
export default reducer;
