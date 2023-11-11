import axios from 'axios';

//const url = 'https://cstivalpoker.com/wp-json/cstival/v1'
//const url = 'http://localhost:8080/wp-json/cstival/v1';

const url = process.env.REACT_APP_API_URL;


const getData = async (key, situation) => {
	return axios
		.get(`${url}/ranges`, {
			params: {
				key,
				situation
			}
		})
		.then(r => {
			try {
				const { bluff, call, raise, fold, info } = r.data[0];
				const tableState = {
					bluff,
					call,
					raise,
					fold,
					info: JSON.parse(info.replace(/'/g, '"'))
				};
				return tableState;
			} catch (error) {
				console.log({ error });
			}
		});
};

const saveRange = async body => {
	return axios({
		method: 'post',
		url: `${url}/ranges`,
		data: body
	}).then(r => {
		return r;
	});
};

const login = async body => {
	return axios({
		method: 'post',
		url: `${url}/login`,
		data: body
	}).then(r => {
		return r;
	});
};

export { getData, saveRange, login };
