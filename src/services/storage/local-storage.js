import { add, getUnixTime } from 'date-fns';
import { REFRESH_TOKEN_KEY, TOKEN_KEY, TOKEN_THRESHOLD_KEY } from './constants.js';

const setThreshold = time => {
	const expirationTime = time || 3600;
	return getUnixTime(add(new Date(), { seconds: expirationTime })).toString();
};

const handleItem = (key, value) => {
	if (value) {
		localStorage.setItem(key, value);
	} else {
		localStorage.removeItem(key);
	}
};

const removeItems = () => {
	handleItem(TOKEN_KEY);
	handleItem(TOKEN_THRESHOLD_KEY);
	handleItem(REFRESH_TOKEN_KEY);
};

export {
	setThreshold,
	handleItem,
	removeItems
};
