import axios from 'axios';

//const url = 'https://cstivalpoker.com/wp-json/cstival/v1'
//const url = 'http://localhost:8080/wp-json/cstival/v1';

const url = process.env.REACT_APP_API_URL;

console.log({url})
const getData = async (situation_type, range_key, effective_stack) => {

	console.log({ situation_type, range_key, effective_stack });
	return axios
		.get(`${url}/ranges`, {
			params: {
				situation_type,
				range_key,
				effective_stack: effective_stack.replace(/[a-zA-Z]/g, '')
			}
		})
		.then(r => {
			try {
				console.log({ r });
				const { notes, ...rest } = r.data[0];
				console.log({ notes, ...rest });
				const tableState = {
					...rest,
					notes: JSON.parse(notes.replace(/'/g, '"'))
				};
				console.log('***************');
				console.log({ tableState });
				console.log('***************');
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
