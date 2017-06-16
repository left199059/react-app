import { combineReducers } from 'redux';

const userInfo = (state = {}, action) => {
  switch (action.type) {
    case 'SAVE_USERINFO':
      return { ...state, ...action.data };
    default:
      return state;
  }
};

const combReducer = combineReducers({
  userInfo,
});
export default combReducer;

