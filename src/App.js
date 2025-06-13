// App.js (or any other high-level component)
import React, { useEffect, useState } from 'react';
import Home from './components/features/containers/home/index.js';
import { MyContextProvider } from './context/context.js';

import { CookiesProvider, useCookies } from 'react-cookie';
import LoginForm from './components/features/containers/login/index.js';

import { useCustomEventListener } from 'react-custom-events';

import { ToastContainer } from 'react-toastify';
import { Spinner } from './components/common/Spinner/index.js';

const App = () => {
	let [cookies, setCookie] = useCookies();
	const [user, setUser] = useState();

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const data = cookies['user'];
		setUser(data);
		setLoading(false);
	}, [cookies]);

	useCustomEventListener('cs-login', async data => {
		setCookie('user', data.user);
		setUser(data.user);
	});

	if (loading) {
		return (
			<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
				<Spinner />
			</div>
		);
	}

	return (
		<MyContextProvider>
			<CookiesProvider>
				<ToastContainer />
				{!user && <LoginForm></LoginForm>}
				{user && <Home user={user} />}
			</CookiesProvider>
		</MyContextProvider>
	);
};

export default App;
