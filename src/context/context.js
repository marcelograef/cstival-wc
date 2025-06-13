// context.js
import { createContext, useState } from 'react';
import { initialState } from '../utils/constants/constants.js';

const MyContext = createContext();

export const MyContextProvider = ({ children }) => {
	const [tableValues, setTableValues] = useState(initialState);
	const [isLoading, setIsLoading] = useState(false);


	return (
		<MyContext.Provider value={{ tableValues, setTableValues, isLoading, setIsLoading }}>
			{children}
		</MyContext.Provider>
	);
};

export default MyContext;
