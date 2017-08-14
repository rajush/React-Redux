/**
 * we define all of the reducers that we're wanting to combine for our application.
 */

import {combineReducers} from 'redux';
import courses from './courseReducer';
import authors from './authorReducer';

const rootReducer = combineReducers({
  courses,
  authors
});

export default rootReducer;
