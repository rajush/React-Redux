/**
 * In Redux, the events happening in the application are called actions. Actions are just plain objects containing a
 * description of an event. An action must have a 'type' property. The rest of its shape is up to us. It could be a
 * complex object, a simple number, a Boolean, any value that's serializable. The only things that we shouldn't try
 * passing around in our actions are things that won't serialize to JSON like functions or promises.
 * When actions are dispatched, it ultimately affects what data is in the store.
 */

import * as types from './actionTypes';

export function createCourse(course) {
  return {  type: types.CREATE_COURSE, course };
}
