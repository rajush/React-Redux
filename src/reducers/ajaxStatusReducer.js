import * as types from '../actions/actionTypes';
import initialState from './initialState';

/**
 * Using the substring function to be able to get the end of our action type and see whether it ends in success.
 * It's important to note that we're now handling the same action in multiple reducers. Any action type that ends
 * in success will now be handled here as well as in another reducer. And there's nothing wrong with this. In fact,
 * it's quite powerful.
 * Remember, each reducer is simply a slice of state. So a given action may impact multiple reducers.
 */
function actionTypeEndsInSuccess(type) {
  return type.substring(type.length - 8) == '_SUCCESS';
}

export default function ajaxStatusReducer(state = initialState.ajaxCallsInProgress, action) {
  if (action.type == types.BEGIN_AJAX_CALL) {
    /**
     *  Anytime an AJAX call begins, simply increment the state by 1. The state in this case is the ajaxCallsInProgress
     *  counter that we added to initialState.
     */
    return state + 1;

    /**
     * All our thunks ultimately dispatch a success action when they complete. Hence, we can use the success suffix as a
     * signal that the action is completed. This will help us avoid manually dispatching a separate endAjaxCall action every
     * time an AJAX call is completed.
     */
  } else if (actionTypeEndsInSuccess(action.type)) {
    return state - 1;
  }
  return state;
}

/**
 * NOTE:
 *
 *  Everytime we create a new reducer, we need to add the reference to our rootReducer as well.
 */
