import r2wc from '@r2wc/react-to-web-component';
import App from './App.js';

import fs from 'fs';


const wcHome = r2wc(App, { props: { items: 'json' } });

//customElements.define('r2w-home', wcHome);




fs.writeFile('./dist/wc.js', wcHome, err => {
	if (err) {
		console.error(err);
	}
	// file written successfully
});
