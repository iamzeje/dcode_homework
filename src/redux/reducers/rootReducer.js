import { combineReducers } from 'redux';
import feedReducer from './feedReducer';

const rootReducer = combineReducers({
  feedReducer,
});

export default rootReducer;
