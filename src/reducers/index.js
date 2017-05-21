/**
 * we define all of the reducers that we're wanting to combine for our application.
 */

import {combineReducers} from 'redux';
import courses from './courseReducer';

const rootReducer = combineReducers({
  courses
});

export default rootReducer;
