import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  linkedBanks: null,
  linkedBanksLoading: null,
  linkedBanksSuccess: ['items'],
  linkedBanksFailure: ['error'],
  selectBank: ['bankId'],
  preloadAccount: ['tokenId', 'sourceId', 'paymentProcessorId', 'amount'],
  preloadAccountSuccess: null,
  preloadAccountFailure: ['error'],
});

export const BanksTypes = Types;
export const BanksActions = Creators;
