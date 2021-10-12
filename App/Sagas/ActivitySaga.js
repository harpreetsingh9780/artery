import { put, call, takeLatest, all } from 'redux-saga/effects';
import { BalanceTypes } from '../Stores/Balance/Actions';
import { ActivityActions } from '../Stores/Activity/Actions';
import { ActivityService } from '../Services/ActivityService';

function* fetchActivityAsyncSaga() {
  const response = yield call(ActivityService.getActivity);
  if (response) {
    yield put(ActivityActions.activitySuccess(response));
  } else {
    yield put(ActivityActions.activityFailure('Failed to retrieve your activity.'));
  }
}

export function* activitySaga() {
  yield all([takeLatest(BalanceTypes.BALANCE, fetchActivityAsyncSaga)]);
}
