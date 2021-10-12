import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  balance: ['tokenId'],
  balanceLoading: null,
  balanceSuccess: ['balance', 'pendingBalance'],
  balanceFailure: ['error'],
});

export const BalanceTypes = Types;
export const BalanceActions = Creators;
