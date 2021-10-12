import { put, call, takeLatest, all, select } from 'redux-saga/effects';
import { ConfigActions, ConfigTypes } from '../Stores/Config/Actions';
import { ConfigService } from '../Services/ConfigService';
import { getSelectedTokenId } from '../Stores/Config/Selectors';

function* loadTokensAsyncSaga() {
  const tokenId = yield select(getSelectedTokenId);
  const response = yield call(ConfigService.getSupportedTokens, tokenId);
  if (response) {
    yield put(ConfigActions.tokensSuccess(response));
  } else {
    yield put(ConfigActions.tokensFailure('Failed to retrieve token list.'));
  }
}

export function* configSaga() {
  yield all([takeLatest(ConfigTypes.TOKENS, loadTokensAsyncSaga)]);
}
