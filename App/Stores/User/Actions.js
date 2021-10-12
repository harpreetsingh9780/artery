import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  user: ['handle'],
  prepare: null,
  userLoading: null,
  userSuccess: ['user'],
  userAfterLogin: ['user'],
  userFailure: ['error'],
});

export const UserTypes = Types;
export const UserActions = Creators;
