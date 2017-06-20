import { combineReducers } from 'redux';

const userInfo = (state = {}, action) => {
  switch (action.type) {
    case 'SAVE_USERINFO':
      return { ...state, ...action.data };
    default:
      return state;
  }
};

const ads = (state = [], action) => {
  switch (action.type) {
    case 'SAVE_ADS':
      return [...action.data];
    default:
      return state;
  }
};

const wxInfos = (state = [], action) => {
  switch (action.type) {
    case 'SAVE_WXINFOS':
      return [...action.data];
    default:
      return state;
  }
};

const money = (state = 0, action) => {
  switch (action.type) {
    case 'SAVE_MONEY':
      return action.data;
    default:
      return state;
  }
};

const chance = (state = 0, action) => {
  switch (action.type) {
    case 'SAVE_CHANCE':
      return action.data;
    default:
      return state;
  }
};

const combReducer = combineReducers({
  userInfo,
  ads,
  wxInfos,
  money,
  chance,
});
export default combReducer;

