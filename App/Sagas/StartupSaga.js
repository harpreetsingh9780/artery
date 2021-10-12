import { select, put } from 'redux-saga/effects';
import NavigationService from 'App/Services/NavigationService';
import { getTokenSelector } from '../Stores/Login/Selectors';
import { UserActions } from '../Stores/User/Actions';
import { ConfigActions } from '../Stores/Config/Actions';
import { getUserSelector } from '../Stores/User/Selectors';
import { BanksActions } from '../Stores/Banks/Actions';
import { ActivityActions } from '../Stores/Activity/Actions';

/**
 * The startup saga is the place to define behavior to execute when the application starts.
 */
export function* startup() {
  // yield put(LoginActions.logout()); //use this if you need to forcefully clean state.

  // Get user independent data.
  yield put(ConfigActions.tokens());

  const token = yield select(getTokenSelector);

  if (!token) {
    NavigationService.navigateAndReset('LoginScreen');
  } else {
    yield prepareUser();
    NavigationService.navigateToHome();
  }
}

export function* prepareUser() {
  const { handle } = yield select(getUserSelector);
  yield put(UserActions.user(handle));
  yield put(BanksActions.linkedBanks());
  yield put(ActivityActions.activity());
}
