//There's a set of features in ES6 that Babel cannot transpile. For those
//we need to use a polyfill. We could potentially pull in individual polyfill.
import 'babel-polyfill';

import React from 'react';
import {render} from 'react-dom';
import {Router, browserHistory} from 'react-router';

import routes from './routes';
import './styles/styles.css'; //Webpack can import CSS files too! It will end up bundling these files.
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

//Application's entry point. Here we pass in our routes component.
render(
  <Router history={browserHistory} routes={routes}/>,
  document.getElementById('app')
);
