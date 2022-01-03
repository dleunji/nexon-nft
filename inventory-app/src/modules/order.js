import  { createAction, handleActions } from 'redux-actions';

const CLICK_ORDER = 'dropdown/CLICK_ORDER';
const HOVER_ORDER = 'dropdown/HOVER_ORDER';
const CHANGE_ORDER = 'dropdown/CHANGE_ORDER';
const INITIALIZE_ORDER = 'dropdown/INITIALIZE_ORDER';

export const clickOrder = createAction(CLICK_ORDER);
export const hoverOrder = createAction(HOVER_ORDER, hover => hover);
export const changeOrder = createAction(CHANGE_ORDER, order => order);
export const initializeOrder = createAction(INITIALIZE_ORDER);

const initialState = {
  display: false,
  hover: 0,
  order: 0,
};

const order = handleActions(
  {
    [CLICK_ORDER] : (state) => ({
      ...state,
      display: !['display'],
    }),
    [CHANGE_ORDER] : (state, {payload: order}) => ({
      ...state,
      order: order
    }),
    [INITIALIZE_ORDER] : (state) => ({
      ...state,
      display: initialState['display'],
      hover: initialState['hover'],
      order: initialState['order']
    }),
    [HOVER_ORDER]: (state, {payload: hover}) => ({
      ...state,
      hover: hover
    })
  },
  initialState
);

export default order;


