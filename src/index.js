import r2wc from '@r2wc/react-to-web-component';


import './assets/styles/index.scss';
import App from './App.js';



const wcHome = r2wc(App, { props: { items: 'json' } });

customElements.define('r2w-home', wcHome);

