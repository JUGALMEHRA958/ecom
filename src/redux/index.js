// index.js
import { combineReducers } from 'redux';
import tabReducer from './tabReducer';

const rootReducer = combineReducers({
  tab: tabReducer
});

export default rootReducer;
