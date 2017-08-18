import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function courseReducer(state = initialState.courses, action) {
  switch (action.type) {
    case types.LOAD_COURSES_SUCCESS:
      return action.courses;

    case types.CREATE_COURSES_SUCCESS:
      /**
       * Our first instinct when handling an add is likely just to push another element into an array. So we might be tempted
       * to just say 'state.push' here. But, remember, in Redux, state is immutable. Immutability is important for performance,
       * simplicity, and predictability. And it's precisely what enables interesting features like time-travel debugging. So we
       * can't simply push another value into state right here.
       *
       * As a reminder, these 'three dots' are the 'ES6 spread operator'.
       * And what the spread operator does is explode all the values inside the array right here, just as though we had piped out
       * all the values of the array one by one by hand. It just spreads the values out. In this case, that's really handy because
       * state is immutable. So the spread operator effectively creates a copy of our existing array of courses that are held in
       * state, and then we can include the new course that was just saved within the new array that we're creating.
       *
       * We just use 'Object.assign' to make sure that we're creating our own copy here rather than attaching to an existing reference.
       * Also, remember, the state variable here represents just an array of courses. That's it. It's a specific slice of our entire store.
       * So this reducer is only handling an array of courses.
       */
      return [
        ...state,
        Object.assign({}, action.course)
      ];

    case types.UPDATE_COURSES_SUCCESS:
      /**
       * Again, since state is immutable, we can't simply change the appropriate index in the array. Instead, we need to use the
       * 'filter' function, which is part of ES6, to get a list of all the courses except for the course that's being updated.
       * We use the 'spread operator' on the front, and that is what creates a brand-new array out of the filtered results that
       * are returned from filter. And then we use 'Object.assign' to create a copy of the course passed in and include it in the
       * array that we're ultimately returning. 
       */
      return [
        ...state.filter(course => course.id !== action.course.id),
        Object.assign({}, action.course)
      ];

    default:
      return state;
  }
}
