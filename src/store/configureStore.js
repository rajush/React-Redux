/**
 * define a function that configures the store because we'll call this function at our application's entry point.
 * This way, the store's configured when the app starts up.
 */

import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducers';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';

/**
 * we will use this at the entry point of our application. The configureStore function should accept one parameter,
 * which is the initial state for your app.
 * (This is a good way to initialize your store with some state, especially when you're doing server-side rendering)
 *
 * NOTE: To add thunk to our middleware we, of course, need to first import it. And once we've done so, we can just
 * add it here to the list of arguments that we're passing to applyMiddleware. It's really as simple as that. So we
 * could pass as many pieces of middleware as we want to the applyMiddleware function. We could, of course, add other
 * middleware at this point. And the Redux docs list a number of interesting pieces of middleware that you can consider
 * for things like logging, scheduling actions, and sending crash reports when issues occur.
 */
export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk, reduxImmutableStateInvariant())
  );
}
