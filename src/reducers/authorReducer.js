import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function authorReducer(state = initialState.authors, action) {
  switch (action.type) {
    case types.LOAD_AUTHORS_SUCCESS:
      return action.authors;

    default:
      return state;
  }
}

/**
 * NOTE:
 *
 *  Everytime we create a new reducer, we need to add the reference to our rootReducer as well.
 */
