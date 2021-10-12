import { put, call, takeLatest, all, select } from 'redux-saga/effects';
import { getSelectedTokenId } from '../Stores/Config/Selectors';
import { BalanceActions, BalanceTypes } from '../Stores/Balance/Actions';
import { BalanceService } from '../Services/BalanceService';

function* fetchBalanceAsyncSaga() {
  const tokenId = yield select(getSelectedTokenId);
  const response = yield call(BalanceService.balance, tokenId);
  if (response) {
    yield put(BalanceActions.balanceSuccess(response.balance, response.pendingBalance));
  } else {
    yield put(BalanceActions.balanceFailure('Failed to retrieve your balance.'));
  }
}

export function* balanceSaga() {
  yield all([takeLatest(BalanceTypes.BALANCE, fetchBalanceAsyncSaga)]);
}
