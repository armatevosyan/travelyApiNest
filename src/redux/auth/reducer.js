import { handleActions } from 'redux-actions';
import { loginRequest, loginSuccess, loginFailure, enterAccountRequest, enterAccountSuccess, enterAccountFailure } from './actions';

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
        localStorage.setItem(`${state.user?.role}-token`, currentUserToken);

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
