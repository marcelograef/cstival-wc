import React, { useState } from 'react';
import { login } from '../../utilities';

import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';

import { emitCustomEvent } from 'react-custom-events';

import './index.scss';
import { Wrapper } from '../../components';

function LoginForm() {
	const [user, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [processing, setProcessing] = useState(false);

	const [cookies, setCookie, removeCookie] = useCookies(['user']);
	const [data, setData] = useState();

	/* useEffect(() => {
		setCookie('user', 'test');
		setData({ user: 'test' });
	}, []);

	useEffect(() => {
		console.log('cookies changed');
	}, [data]); */

	const handleSubmit = async e => {
		e.preventDefault();
		// You can add your login logic here, like sending data to a server or checking credentials
		console.log('Username:', user);
		console.log('Password:', password);

		try {
			setProcessing(true);
			const res = await login({
				user,
				password
			});
			console.log(res);
			console.log(res.status);
			if (res.status === 200) {
				setCookie('user', user);
			}

			emitCustomEvent('cs-login', { user });
		} catch (error) {
			setCookie('user', null);
			if (error.code === 'ERR_BAD_REQUEST') {
				toast.info(error?.response?.data.message);
			} else {
				toast.error(error.message);
			}
			console.log({ error });
			emitCustomEvent('cs-login', { user: null });
		}
		setProcessing(false);
	};

	return (
		<div className="login-container">
			<div className="login-form">
				<h2>Login</h2>
				<form onSubmit={handleSubmit}>
					<div>
						<label htmlFor="user">Username</label>
						<input type="text" id="user" value={user} onChange={e => setUsername(e.target.value)} />
					</div>
					<div>
						<label htmlFor="password">Password</label>
						<input
							type="password"
							id="password"
							value={password}
							onChange={e => setPassword(e.target.value)}
						/>
					</div>
					<button type="submit" disabled={processing} className={processing ? 'disable' : ''}>
						{processing ? 'Procesando...' : 'Login'}
					</button>
				</form>
			</div>
		</div>
	);
}

export default LoginForm;
