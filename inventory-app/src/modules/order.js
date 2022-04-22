import { createAction, handleActions } from 'redux-actions';

const TOGGLE_ORDER = 'dropdown/TOGGLE_ORDER';
const CHANGE_ORDER = 'dropdown/CHANGE_ORDER';
const INITIALIZE_ORDER = 'dropdown/INITIALIZE_ORDER';

export const changeOrder = createAction(CHANGE_ORDER, (idx) => idx);
export const initializeOrder = createAction(INITIALIZE_ORDER);

const initialState = {
  order: 0,
};

const order = handleActions(
  {
    [CHANGE_ORDER]: (state, { payload: value }) => ({
      ...state,
      order: value,
    }),
    [INITIALIZE_ORDER]: (state) => ({
      ...state,
      display: initialState['display'],
      order: initialState['order'],
    }),
  },
  initialState,
);

export default order;
