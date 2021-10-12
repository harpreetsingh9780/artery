import { createReducer } from 'reduxsauce';
import { INITIAL_STATE } from './InitialState';
import { ConfigTypes } from './Actions';

export const selectTokenId = (state, { tokenId }) => ({
  ...state,
  tokenId,
});

export const toggleSidebar = (state) => ({
  ...state,
  sidebarOpen: !state.sidebarOpen,
});

export const tokensLoading = (state) => ({
  ...state,
  tokensLoading: true,
});

export const tokensSuccess = (state, { items }) => ({
  ...state,
  tokensList: items,
  tokensLoading: false,
  tokensError: null,
});

export const tokensFailure = (state, { error }) => ({
  ...state,
  tokensLoading: false,
  tokensError: error,
});

export const reducer = createReducer(INITIAL_STATE, {
  [ConfigTypes.SELECT_TOKEN_ID]: selectTokenId,
  [ConfigTypes.TOGGLE_SIDEBAR]: toggleSidebar,
  [ConfigTypes.TOKENS]: tokensLoading,
  [ConfigTypes.TOKENS_SUCCESS]: tokensSuccess,
  [ConfigTypes.TOKENS_FAILURE]: tokensFailure,
});
