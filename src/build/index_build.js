
import React from 'react';
import ReactDOM from 'react-dom';

/* eslint import/no-webpack-loader-syntax: off */
//import css from 'raw-loader!./assets/styles/index.scss';

import './assets/styles/index.scss';

import App from './App.js';

const build = false;

/* if (build){

	const wcHome = r2wc(App, React, ReactDOM, { shadow: 'open' });
	//const wcHome = r2wc(App);


	customElements.define('wc-cstival', wcHome);

}


else{
 */

class MyWebComponent extends HTMLElement {
	constructor() {
		super();
		// Do something more
	}

	connectedCallback() {
		// Create a ShadowDOM
		const root = this.attachShadow({ mode: 'open' });

		const style = document.createElement('style');

		style.textContent = "{{{css_to_replace}}}";
		// Create a mount element
		const mountPoint = document.createElement('div');

		root.appendChild(style);
		root.appendChild(mountPoint);

		// You can directly use shadow root as a mount point
		ReactDOM.render(<App />, mountPoint);
	}
}

customElements.define('wc-cstival', MyWebComponent);
//}
