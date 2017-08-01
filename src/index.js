//There's a set of features in ES6 that Babel cannot transpile. For those
//we need to use a polyfill. We could potentially pull in individual polyfill.
import 'babel-polyfill';

import React from 'react';
import {render} from 'react-dom';
import {Router, browserHistory} from 'react-router';

//To make our app's entry point to work with Redux.
import configureStore from './store/configureStore';
//Provider is is a higher-order component that attaches our store to our React container components.
import {Provider} from 'react-redux';

import routes from './routes';
import {loadCourses} from './actions/courseActions';
import './styles/styles.css'; //Webpack can import CSS files too! It will end up bundling these files.
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';


/**
 * create an instance of our store. We are not passing any initial state here because
 * Currently, our reducer already sets its initial state using an ES6 default parameter.
 * (If we pass initial state here, we'd be overriding the default parameters that we specify in our reducers.)
 *
 * Once the store is configured, we can go ahead and dispatch actions against the store.
 */
const store = configureStore();
store.dispatch(loadCourses()); // dispatching loadCourses on load

/**
 * Application's entry point. Here we pass in our routes component.
 * Wrap our Router component with the Provider component, that takes one prop, which is the store.
 * Provider component is wrapping our entire application so that it can be connected to our Redux store. And because our
 * application is wrapped in the Provider component, we'll be able to access our Redux store in our components.
 */
render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes}/>
  </Provider>,
  document.getElementById('app')
);
