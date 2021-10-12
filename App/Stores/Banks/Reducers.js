import { createReducer } from 'reduxsauce';
import { INITIAL_STATE } from './InitialState';
import { BanksTypes } from './Actions';

export const linkedBanksLoading = (state) => ({
  ...state,
  linked: { ...state.linked, loading: true, error: null },
});

export const linkedBanksSuccess = (state, { items }) => ({
  ...state,
  selectedBankId:
    items.find((item) => item.referenceId === state.selectedBankId)?.referenceId ||
    items[0]?.referenceId ||
    null,
  linked: { items, loading: false, error: null },
});

export const linkedBanksFailure = (state, { error }) => ({
  ...state,
  selectedBankId: null,
  linked: { items: [], loading: false, error },
});

export const selectBankId = (state, { bankId }) => ({
  ...state,
  selectedBankId: bankId,
});

export const preloadAccount = (state) => ({
  ...state,
  preloadAccountLoading: true,
  preloadAccountError: null,
});

export const preloadAccountSuccess = (state) => ({
  ...state,
  preloadAccountLoading: false,
  preloadAccountError: null,
});

export const preloadAccountFailure = (state, { error }) => ({
  ...state,
  preloadAccountLoading: false,
  preloadAccountError: error,
});

export const reducer = createReducer(INITIAL_STATE, {
  [BanksTypes.LINKED_BANKS_LOADING]: linkedBanksLoading,
  [BanksTypes.LINKED_BANKS_SUCCESS]: linkedBanksSuccess,
  [BanksTypes.LINKED_BANKS_FAILURE]: linkedBanksFailure,
  [BanksTypes.SELECT_BANK]: selectBankId,
  [BanksTypes.PRELOAD_ACCOUNT]: preloadAccount,
  [BanksTypes.PRELOAD_ACCOUNT_SUCCESS]: preloadAccountSuccess,
  [BanksTypes.PRELOAD_ACCOUNT_FAILURE]: preloadAccountFailure,
});
