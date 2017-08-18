/**
 * In Redux, the events happening in the application are called actions. Actions are just plain objects containing a
 * description of an event. An action must have a 'type' property. The rest of its shape is up to us. It could be a
 * complex object, a simple number, a Boolean, any value that's serializable. The only things that we shouldn't try
 * passing around in our actions are things that won't serialize to JSON like functions or promises.
 * When actions are dispatched, it ultimately affects what data is in the store.
 */

import * as types from './actionTypes';
import courseApi from '../api/mockCourseApi';

export function loadCoursesSuccess(courses) {
  return {  type: types.LOAD_COURSES_SUCCESS, courses };
}

export function createCourseSuccess(courses) {
  return {  type: types.CREATE_COURSES_SUCCESS, courses };
}

export function updateCourseSuccess(courses) {
  return {  type: types.UPDATE_COURSES_SUCCESS, courses };
}

/**
 * THUNK
 * A thunk always returns a function that accepts a dispatch -- 'return function(dispatch)'. So this wrapper function
 * will exist in every one of our thunks.
 * Inside the body of our thunk, it's a pretty logical spot to go ahead and make our API call.
 */
export function loadCourses() {
    return function(dispatch) {
        return courseApi.getAllCourses().then(courses => {
          /**
           * We're ready to dispatch an action creator. So we dispatch something called 'loadCoursesSuccess'.
           * And we will pass it a list of courses.
           */
            dispatch(loadCoursesSuccess(courses));
        }).catch(error => {
            throw(error);
        });
    };
}

export function saveCourse(course) {
    /**
     * There's an optional parameter called 'getState' we could use. This is useful for cases where we are wanting
     * to access the Redux store and get particular pieces of state out of it right here without having to pass it
     * in as a parameter. in larger applications, it can be useful to just access the Redux store directly to get
     * pieces of state that we need to work within our thunk.
     */
    return function (dispatch, getState) {
        return courseApi.saveCourse(course).then(savedCourse => {
            course.id ? dispatch(updateCourseSuccess(savedCourse)):
                        dispatch(createCourseSuccess(savedCourse));
        }).catch(error => {
            throw(error);
        });
    };
}
