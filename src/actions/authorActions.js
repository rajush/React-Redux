/**
 * In Redux, the events happening in the application are called actions. Actions are just plain objects containing a
 * description of an event. An action must have a 'type' property. The rest of its shape is up to us. It could be a
 * complex object, a simple number, a Boolean, any value that's serializable. The only things that we shouldn't try
 * passing around in our actions are things that won't serialize to JSON like functions or promises.
 * When actions are dispatched, it ultimately affects what data is in the store.
 */

import * as types from './actionTypes';
import AuthorApi from '../api/mockAuthorApi';

export function loadAuthorsSuccess(authors) {
  return {  type: types.LOAD_AUTHORS_SUCCESS, authors };
}

/**
 * THUNK
 * A thunk always returns a function that accepts a dispatch -- 'return function(dispatch)'. So this wrapper function
 * will exist in every one of our thunks.
 * Inside the body of our thunk, it's a pretty logical spot to go ahead and make our API call.
 */
export function loadAuthors() {
    return dispatch => {
        return AuthorApi.getAllAuthors().then(authors => {
          /**
           * We're ready to dispatch an action creator. So we dispatch something called 'loadAuthorsSuccess'.
           * And we will pass it a list of authors.
           */
            dispatch(loadAuthorsSuccess(authors));
        }).catch(error => {
            throw(error);
        });
    };
}
