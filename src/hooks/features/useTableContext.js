// src/context/useTableContext.js
import { useContext } from 'react';
import MyContext from '../../components/index';

const useTableContext = () => useContext(MyContext);
export default useTableContext;
