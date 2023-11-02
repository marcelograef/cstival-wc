// App.js (or any other high-level component)
import React, { useEffect, useState } from 'react';
import { MyContextProvider } from './context.js';
import Home from './containers/home/index.js';

import { CookiesProvider, useCookies, Cookies } from 'react-cookie';
import LoginForm from './containers/login/index.js';

import { useCustomEventListener } from 'react-custom-events';

import { ToastContainer, toast } from 'react-toastify';
import { Spinner } from './components/index.js';

const App = () => {
	let [cookies, setCookie, removeCookie] = useCookies();
	const [user, setUser] = useState();

	const [loading, setLoading] = useState(true);

	const checkUser = () => {
		const data = cookies['user'];
		setUser(data);
	};

	useEffect(() => {
		/* setCookie('user', 'test');
		setData({ user: 'test' }); */
		const data = cookies['user'];
		setUser(data);
		setLoading(false);
	}, []);

	// const { t } = useTranslation();

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
	// const { t } = useTranslation();
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
