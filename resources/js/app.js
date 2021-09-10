/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

require('../js/bootstrap');

/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */


//start imports
import React from 'react';

// component to send user notifications
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import ReactDOM from 'react-dom';
import Router from '../js/Router';

//global styles
import '../css/app.css';

ReactDOM.render(
  <React.StrictMode>
    <Router />
    <ToastContainer autoClose={3000} />
  </React.StrictMode>,
  document.getElementById('root')
);


