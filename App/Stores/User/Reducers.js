import { createReducer } from 'reduxsauce';
import { INITIAL_STATE } from './InitialState';
import { UserTypes } from './Actions';

export const userLoading = (state) => ({
  ...state,
  loading: true,
  error: null,
});

export const userSuccess = (state, { user }) => ({
  ...state,
  id: user.id,
  firstName: user.firstName,
  lastName: user.lastName,
  handle: user.handle,
  loading: false,
  error: null,
});

export const userAfterLogin = (state, { user }) => ({
  ...state,
  id: user.userId,
  handle: user.handle,
  email: user.email,
  phone: user.phone,
  phoneCountryCode: user.phoneCountryCode,
  type: user.type,
  walletAddress: user.walletAddress,
  loading: false,
  error: null,
});

export const userFailure = (state, { error }) => ({
  ...state,
  id: null,
  firstName: null,
  lastName: null,
  handle: null,
  loading: false,
  error: error,
});

export const reducer = createReducer(INITIAL_STATE, {
  [UserTypes.USER_LOADING]: userLoading,
  [UserTypes.USER_SUCCESS]: userSuccess,
  [UserTypes.USER_FAILURE]: userFailure,
  [UserTypes.USER_AFTER_LOGIN]: userAfterLogin,
});
