import { takeLatest, all } from 'redux-saga/effects';
import { StartupTypes } from 'App/Stores/Startup/Actions';
import { startup } from './StartupSaga';
import { loginSaga } from './LoginSaga';
import { banksSaga } from './BankSaga';
import { configSaga } from './ConfigSaga';
import { userSaga } from './UserSaga';
import { balanceSaga } from './BalanceSaga';
import { activitySaga } from './ActivitySaga';

export default function* root() {
  yield all([
    takeLatest(StartupTypes.STARTUP, startup),
    loginSaga(),
    banksSaga(),
    configSaga(),
    userSaga(),
    balanceSaga(),
    activitySaga(),
  ]);
}
