import { createReducer } from 'reduxsauce';
import { INITIAL_STATE } from './InitialState';
import { LoginTypes } from './Actions';

export const loginLoading = (state) => ({
  ...state,
  loginLoading: true,
  loginError: null,
});

export const loginSuccess = (state, { user }) => ({
  ...state,
  authKey: user.authKey,
  authToken: user.authToken,
  loginLoading: false,
  loginError: null,
});

export const loginFailure = (state, { error }) => ({
  ...state,
  loginLoading: false,
  loginError: error,
});

export const initPage = (state) => ({
  ...state,
  loginLoading: false,
  loginError: null,
  signUpLoading: false,
  signUpError: null,
});

export const reducer = createReducer(INITIAL_STATE, {
  [LoginTypes.LOGIN_LOADING]: loginLoading,
  [LoginTypes.LOGIN_SUCCESS]: loginSuccess,
  [LoginTypes.LOGIN_FAILURE]: loginFailure,
  [LoginTypes.LOGIN_INIT]: initPage,
});
