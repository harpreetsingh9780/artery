import { combineReducers } from 'redux';
import configureStore from './CreateStore';
import rootSaga from 'App/Sagas';
import { LoginTypes } from './Login/Actions';
import { reducer as LoginReducer } from './Login/Reducers';
import { reducer as BanksReducer } from './Banks/Reducers';
import { reducer as UserReducer } from './User/Reducers';
import { reducer as ConfigReducer } from './Config/Reducers';
import { reducer as BalanceReducer } from './Balance/Reducers';
import { reducer as ActivityReducer } from './Activity/Reducers';

export default () => {
  const rootReducer = (state, action) => {
    if (action.type === LoginTypes.LOGOUT) {
      state = undefined;
    }

    return combineReducers({
      login: LoginReducer,
      banks: BanksReducer,
      user: UserReducer,
      config: ConfigReducer,
      balance: BalanceReducer,
      activity: ActivityReducer,
    })(state, action);
  };

  return configureStore(rootReducer, rootSaga);
};
