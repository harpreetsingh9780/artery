export const getLinkedBanksSelector = (state) => state.banks.linked.items;
export const getSelectedBankIdSelector = (state) => state.banks.selectedBankId;
export const getSelectedBankSelector = (state) =>
  state.banks.linked.items.find((item) => item.referenceId === state.banks.selectedBankId) || null;
export const getPreloadAccountLoadingSelector = (state) => state.banks.preloadAccountLoading;
export const getPreloadAccountErrorSelector = (state) => state.banks.preloadAccountError;
