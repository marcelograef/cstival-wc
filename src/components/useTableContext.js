// src/context/useTableContext.js
import { useContext } from 'react';
import MyContext from './index';

const useTableContext = () => useContext(MyContext);
export default useTableContext;
