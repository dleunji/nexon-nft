import  { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import { takeLatest } from '@redux-saga/core/effects';
import createRequestSaga, { createRequestActionTypes } from '../lib/createRequestSaga';
import * as authAPI from '../lib/api/auth';

const CHANGE_FIELD = 'auth/CHANGE_FIELD';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';

const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createRequestActionTypes(
  'auth/LOGIN',
)

// 액션 생성
export const changeField = createAction(
  CHANGE_FIELD,
  ({key, value}) => ({
    key, // userAddress, password
    value, // 실제 바꾸려는 값
  }),
);

export const initializeForm = createAction(INITIALIZE_FORM);
// 초기 state
const initialState = {
  login: {
    userAddress: '',
    password: ''
  },
  auth: null,
  authError: null,
};

export const login = createAction(LOGIN, ({ userAddress, password }) => ({
  userAddress,
  password
}));

// 사가 생성
const loginSaga = createRequestSaga(LOGIN, authAPI.login);
export function* authSaga() {
  // 요청이 여러 번 와도 가장 최신의 요청만 처리
  yield takeLatest(LOGIN, loginSaga);
}


const auth = handleActions(
  {
    [CHANGE_FIELD]: (state, { payload: {key, value} }) => 
      produce(state, draft => {
        draft['login'][key] = value; // e.g. state.userAddress 변경
      }),
    [INITIALIZE_FORM]: (state) => ({
      ...state,
      ['login'] : initialState['login']
    }),
    [LOGIN_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      authError: null,
      auth : true,
    }),
    [LOGIN_FAILURE]: (state, { payload: error}) => ({
      ...state,
      authError: error,
    })
  },
  initialState,
);

export default auth;