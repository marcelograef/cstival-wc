// hooks/useROL.js
import { useEffect, useState, useContext } from 'react';
import { getData } from '../utilities';
import { getRealPositionROL } from '../utilities';
import { getPositionsComponent } from '../utilities/getPositionsComponent';
import { calculateAvg } from '../utilities/calculateInfo';
import { initialState } from '../constants';
import MyContext from '../context';

export const useROL = ({ setControlsContent }) => {
	const { setTableValues, setIsLoading } = useContext(MyContext);
	const [yourPosition, setYourPosition] = useState('');
	const [range, setRange] = useState(initialState);

	useEffect(() => {
		if (!yourPosition) return;
		const index = 'UTG,UTG+1,MP,MP+1,HJ,CO,BU,SB,BB'.split(',').indexOf(yourPosition);
		const realPos = getRealPositionROL(index);
		setIsLoading(true);
		setTableValues(initialState);
		getData('ROL', realPos).then(data => {
			setRange(data);
			setTableValues(data);
			setIsLoading(false);
		});
	}, [yourPosition]);

	useEffect(() => {
		setControlsContent(
			getPositionsComponent({
				situation: 'ROL',
				selected: yourPosition,
				onClick: setYourPosition
			})
		);
	}, [yourPosition]);
};
