/**
 * define a function that configures the store because we'll call this function at our application's entry point.
 * This way, the store's configured when the app starts up.
 */

import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducers';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';

/**
 * we will use this at the entry point of our application. The configureStore function should accept one parameter,
 * which is the initial state for your app.
 * (This is a good way to initialize your store with some state, especially when you're doing server-side rendering)
 */
export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(reduxImmutableStateInvariant())
  );
}
