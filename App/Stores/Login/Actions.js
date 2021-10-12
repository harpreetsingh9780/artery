import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  // Fetch user informations
  login: ['email', 'password'],
  // The operation has started and is loading
  loginLoading: null,
  // User informations were successfully fetched
  loginSuccess: ['user'],
  // An error occurred
  loginFailure: ['error'],
  loginInit: null,
  logout: null,
});

export const LoginTypes = Types;
export const LoginActions = Creators;
