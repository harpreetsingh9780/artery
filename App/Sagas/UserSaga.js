import { put, call, takeLatest, all } from 'redux-saga/effects';
import { UserActions, UserTypes } from '../Stores/User/Actions';
import { UserService } from '../Services/UserService';
import { prepareUser } from './StartupSaga';

function* fetch({ handle }) {
  yield put(UserActions.userLoading());
  const response = yield call(UserService.getUserUsingHandle, handle);
  if (response) {
    yield put(UserActions.userSuccess(response));
  } else {
    yield put(UserActions.userFailure('Unable to retrieve user data.'));
  }
}

export function* userSaga() {
  yield all([takeLatest(UserTypes.USER, fetch), takeLatest(UserTypes.PREPARE, prepareUser)]);
}
