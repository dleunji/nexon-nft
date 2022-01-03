import  { createAction, handleActions } from 'redux-actions';

const TOGGLE_ORDER = 'dropdown/TOGGLE_ORDER';
// const HOVER_ORDER = 'dropdown/HOVER_ORDER';
const CHANGE_ORDER = 'dropdown/CHANGE_ORDER';
const INITIALIZE_ORDER = 'dropdown/INITIALIZE_ORDER';

export const toggleOrder = createAction(TOGGLE_ORDER);
// export const hoverOrder = createAction(HOVER_ORDER, idx => idx);
export const changeOrder = createAction(CHANGE_ORDER, idx => idx);
export const initializeOrder = createAction(INITIALIZE_ORDER);

const initialState = {
  display: false,
  // hover: -1,
  order: null,
};

const order = handleActions(
  {
    [TOGGLE_ORDER] : (state) => ({
      ...state,
      display: !state.display,
    }),
    [CHANGE_ORDER] : (state, {payload: {value}}) => ({
      ...state,
      order: value
    }),
    [INITIALIZE_ORDER] : (state) => ({
      ...state,
      display: initialState['display'],
      order: initialState['order']
    }),
    // [HOVER_ORDER]: (state, {payload: idx}) => ({
    //   ...state,
    //   hover: idx
    // })
  },
  initialState
);

export default order;


