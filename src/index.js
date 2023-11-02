import r2wc from '@r2wc/react-to-web-component';

import React from 'react';
import ReactDOM from 'react-dom';

/* eslint import/no-webpack-loader-syntax: off */
//import css from 'raw-loader!./assets/styles/index.scss';

import './assets/styles/index.scss';

import App from './App.js';

const build = false;

const wcHome = r2wc(App, React, ReactDOM, { shadow: 'open' });
//const wcHome = r2wc(App);

customElements.define('wc-cstival', wcHome);
