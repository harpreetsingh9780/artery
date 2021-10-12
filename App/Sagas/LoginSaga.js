import { put, call, takeLatest, all } from 'redux-saga/effects';
import { LoginActions, LoginTypes } from '../Stores/Login/Actions';
import { LoginService } from '../Services/LoginService';
import NavigationService from '../Services/NavigationService';
import { UserActions } from '../Stores/User/Actions';
import { prepareUser } from './StartupSaga';

function* login({ email, password }) {
  yield put(LoginActions.loginLoading());
  try {
    const response = yield call(LoginService.login, email, password);
    if (response) {
      yield put(LoginActions.loginSuccess(response));
      yield put(UserActions.userAfterLogin(response));
      yield prepareUser();
      NavigationService.navigateToHome();
    } else {
      yield put(LoginActions.loginFailure('Username and/or password not recognized.'));
    }
  } catch (error) {
    yield put(LoginActions.loginFailure('Username and/or password not recognized.'));
  }
}

function* logout() {
  NavigationService.navigateAndReset('LoginScreen');
}

export function* loginSaga() {
  yield all([takeLatest(LoginTypes.LOGIN, login), takeLatest(LoginTypes.LOGOUT, logout)]);
}
