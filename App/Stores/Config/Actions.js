import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  selectTokenId: ['tokenId'],
  tokens: null,
  tokensLoading: null,
  tokensSuccess: ['items'],
  tokensFailure: ['error'],
  toggleSidebar: null,
});

export const ConfigTypes = Types;
export const ConfigActions = Creators;
