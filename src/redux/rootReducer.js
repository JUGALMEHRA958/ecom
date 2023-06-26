// rootReducer.js
import { combineReducers } from 'redux';
import tabReducer from './tabReducer';

const rootReducer = combineReducers({
  tab: tabReducer,
  // other reducers...
});

export default rootReducer;
