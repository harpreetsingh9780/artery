import { put, call, takeLatest, all } from 'redux-saga/effects';
import { BanksActions, BanksTypes } from '../Stores/Banks/Actions';
import { BanksService } from '../Services/BanksService';
import { Alert } from '../Utils/Alert';
import NavigationService from '../Services/NavigationService';
import { BalanceActions } from '../Stores/Balance/Actions';

function* linkedBanks() {
  yield put(BanksActions.linkedBanksLoading());
  const response = yield call(BanksService.getLinkedBanks, null);
  if (response) {
    yield put(BanksActions.linkedBanksSuccess(response));
  } else {
    yield put(BanksActions.linkedBanksFailure('Failed to retrieve banks.'));
  }
}

function* preloadAccount({ tokenId, sourceId, paymentProcessorId, amount }) {
  const response = yield call(BanksService.purchaseTokens, {
    tokenId,
    sourceId,
    paymentProcessorId,
    amount,
  });
  if (response) {
    yield put(BanksActions.preloadAccountSuccess(response));
    yield put(BalanceActions.balance());
    Alert.success({
      message: 'Successfully preloaded.',
      onConfirm: () => {
        NavigationService.navigateToHome();
      },
    });
  } else {
    yield put(BanksActions.preloadAccountFailure('Failed to retrieve banks.'));
  }
}

export function* banksSaga() {
  yield all([
    takeLatest(BanksTypes.LINKED_BANKS, linkedBanks),
    takeLatest(BanksTypes.PRELOAD_ACCOUNT, preloadAccount),
  ]);
}
