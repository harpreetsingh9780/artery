import { createReducer } from 'reduxsauce';
import { INITIAL_STATE } from './InitialState';
import { BalanceTypes } from './Actions';

export const balanceLoading = (state) => ({
  ...state,
  loading: true,
  error: null,
});

export const balanceSuccess = (state, { balance, pendingBalance }) => ({
  ...state,
  balance,
  pendingBalance,
  loading: false,
  error: null,
});

export const balanceFailure = (state, { error }) => ({
  ...state,
  loading: false,
  error: error,
});

export const reducer = createReducer(INITIAL_STATE, {
  [BalanceTypes.BALANCE]: balanceLoading,
  [BalanceTypes.BALANCE_SUCCESS]: balanceSuccess,
  [BalanceTypes.BALANCE_FAILURE]: balanceFailure,
});
