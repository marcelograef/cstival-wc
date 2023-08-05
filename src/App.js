// App.js (or any other high-level component)
import React from 'react';
import { MyContextProvider } from './context.js';
import Home from './containers/home/index.js';

const App = () => {
	return (
		<MyContextProvider>
			<Home />
		</MyContextProvider>
	);
};

export default App;
