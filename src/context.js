// context.js
import { createContext, useState } from 'react';
import { initialState } from './constants.js';

const MyContext = createContext();

export const MyContextProvider = ({ children }) => {
	const [tableValues, setTableValues] = useState(initialState);

	return <MyContext.Provider value={{ tableValues, setTableValues }}>{children}</MyContext.Provider>;
};

export default MyContext;
