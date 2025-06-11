import React, { useEffect, useState, useContext } from 'react';
import { getData } from '../../utilities';
import { calculateAvg } from '../../utilities/calculateInfo';
import { getPositionsComponent } from '../../utilities/getPositionsComponent';
import { CardTable, InfoContainer } from '../index';
import './index.scss';
import MyContext from '../../context';
import { initialState } from '../../constants.js';
import Spinner from '../spinner';

const useOpenRaise = ({ setControlsContent, setInfo }) => {
	const { tableValues, setTableValues, setIsLoading } = useContext(MyContext);
	const [clickPos, setClickPos] = useState('');
	const [avg, setAvg] = useState(null);

	const [selected, setSelected] = useState('');
	const [range, setRange] = useState(initialState);

	useEffect(() => {
		const res = calculateAvg(range);
		setAvg(res);
		setInfo({ ...res, betSize: range?.info?.span02 });
	}, [range]);

	const handleClick = pos => {
		if (pos) {
			setTableValues(initialState);
			setIsLoading(true);
			getData('OR', pos).then(rangeData => {
				setRange(rangeData);

				setTableValues(rangeData);
				setSelected(pos);
				setIsLoading(false);
			});
		}
	};

	useEffect(() => {
		setControlsContent(
			getPositionsComponent({
				situation: 'OpenRaise',
				selected,
				onClick: handleClick
			})
		);
	}, [selected]);
};

export default useOpenRaise;
