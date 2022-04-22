import produce from 'immer';
import  { createAction, handleActions } from 'redux-actions';

const CHANGE_FIELD = 'search/CHANGE_FIELD';
const INITIALIZE_FIELD = 'search/INITIALIZE_FIELD';

export const changeField = createAction(
  CHANGE_FIELD,
  ({key, value}) => ({
    key, // search
    value, // 실제 바꾸려는 값
  }),
);
export const initializeField = createAction(INITIALIZE_FIELD);

const initialState = {
  search :''
};

const search = handleActions(
  {
    [CHANGE_FIELD]: (state, { payload: {key, value} }) => 
      produce(state, draft => {
        draft[key] = value; // e.g. state.userAddress 변경
      }),
    [INITIALIZE_FIELD] : (state) => ({
      ...state,
      ['search']: initialState['search']
      })
  },
  initialState,
);

export default search;