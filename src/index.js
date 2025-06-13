import r2wc from '@r2wc/react-to-web-component';

import React from 'react';
import ReactDOM from 'react-dom';

import './assets/styles/base/index.scss';

import App from './App.js';

const wcHome = r2wc(App, React, ReactDOM, { shadow: 'open' });
//const wcHome = r2wc(App);

customElements.define('wc-cstival', wcHome);
