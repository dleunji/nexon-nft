import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import auth, { authSaga } from './auth';
import loading from './loading';
import user, { userSaga } from './user';
import search from './search';
import order from './order';
const rootReducer = combineReducers({
  auth,
  loading,
  user,
  search,
  order
});

export function* rootSaga() {
  yield all([authSaga(), userSaga()]);
}

export default rootReducer;