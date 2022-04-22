import { createAction, handleActions } from 'redux-actions';
import { call, take, takeLatest } from 'redux-saga/effects';
import * as authAPI from '../lib/api/auth';
import createRequestSaga, { createRequestActionTypes } from '../lib/createRequestSaga';
// 새로고침 이후 임시 로그인 처리
const TEMP_SET_USER = 'user/TEMP_SET_USER';
// 회원 정보 확인
const [CHECK, CHECK_SUCCESS, CHECK_FAILURE] = createRequestActionTypes(
  'user/CHECK',
);

const LOGOUT = 'user/LOGOUT';
const CHANGE_BALANCE = 'user/CHANGE_BALANCE';

export const tempSetUser = createAction(TEMP_SET_USER, user => user);
export const check = createAction(CHECK);
export const logout = createAction(LOGOUT);
export const changeBalance = createAction(CHANGE_BALANCE, balance => balance);
const checkSaga = createRequestSaga(CHECK, authAPI.check);

// yield를 사용하지 않으므로 function*를 사용하여 제너레이터 함수 형태로 만들어주지 않아도 된다.
function checkFailureSaga() {
  try {
    localStorage.removeItem('user');
  } catch(e) {
    console.log('localStorage is not working');
  }
}

function* logoutSaga() {
  try {
    yield call(authAPI.logout); //logout API 호출
    localStorage.removeItem('user');
  } catch(e){
    console.log(e);
  }
}

export function* userSaga() {
  yield takeLatest(CHECK, checkSaga);
  yield takeLatest(CHECK_FAILURE, checkFailureSaga);
  yield takeLatest(LOGOUT, logoutSaga);
}

const initialState = {
  // 지갑 주소 입력
  user: null,
  // 유저의 잔액
  balance : 0,
  checkError: null,
};

export default handleActions(
  {
    [TEMP_SET_USER]: (state, { payload: user }) => ({
      ...state,
      user,
    }),
    [CHECK_SUCCESS] : (state, { payload: user } ) => ({
      ...state,
      user : user.value,
      checkError: null,
    }),
    [CHECK_FAILURE]: (state, { payload: error }) => ({
      ...state,
      user: null,
      checkError: error,
    }),
    [LOGOUT]: state => ({
      ...state,
      user: null
    }),
    [CHANGE_BALANCE]: (state, { payload: balance}) => ({
      ...state,
      balance: balance
    })
  },
  initialState
);

