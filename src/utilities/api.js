import  axios from 'axios';

import { handleItem, setThreshold } from './local-storage.js';
import { API_URL, REFRESH_TOKEN_KEY, TOKEN_KEY, TOKEN_THRESHOLD_KEY } from './constants.js';

const http = axios.create({
	baseURL: API_URL
});

const post = (endpoint, data) =>
	new Promise((resolve, reject) =>
		http
			.post(endpoint, data)
			.then(resolve)
			.catch(e => reject(e.response.data))
	);

const get = endpoint =>
	new Promise((resolve, reject) =>
		http
			.get(endpoint)
			.then(resolve)
			.catch(e => reject(e.response.data))
	);

const patch = (endpoint, data) =>
	new Promise((resolve, reject) =>
		http
			.patch(endpoint, data)
			.then(resolve)
			.catch(e => reject(e.response.data))
	);

const login = data => post('passport/basic/login', data);

const logout = () => post('user/logout');

const passwordReset = data => post('user/reset-password', data);

const signup = data => post('passport/basic/signup', data);

http.interceptors.request.use(
	config => {
		if (config.headers) {
			config.headers['Authorization'] = localStorage.getItem(TOKEN_KEY) || '';
		}

		return config;
	},
	error => Promise.reject(error)
);

http.interceptors.response.use(
	response => response,
	error => {
		const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);

		if (!refreshToken) {
			return Promise.reject(error);
		}

		const originalRequest = error.config;

		if (error.response.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			if (http.defaults.headers) {
				http.defaults.headers['Authorization'] = 'Bearer ' + refreshToken;
			}

			return post('auth/token')
				.then(res => {
					const { access_token, threshold } = res.data;

					handleItem(TOKEN_KEY, access_token);
					handleItem(TOKEN_THRESHOLD_KEY, setThreshold(threshold));

					if (http.defaults.headers) {
						http.defaults.headers['Authorization'] = access_token;
					}

					return http(originalRequest);
				})
				.catch(Promise.reject);
		}

		return Promise.reject(error);
	}
);

export default {
	http,
	post,
	get,
	patch,
	login,
	logout,
	passwordReset,
	signup
};
