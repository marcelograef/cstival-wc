// src/hooks/useSituations.js
import { useEffect, useState, useContext } from 'react';
import { getData } from '../utilities';
import { calculateAvg } from '../utilities/calculateInfo';
import { getPositionsComponent } from '../utilities/getPositionsComponent';
import { initialState } from '../constants';
import MyContext from '../context';

export function useSituation({ type, setControlsContent, setInfo }) {
	const { setTableValues, setIsLoading } = useContext(MyContext);

	const [yourPosition, setYourPosition] = useState('');
	const [villainPosition, setVillainPosition] = useState('');
	const [range, setRange] = useState(initialState);
	const [avg, setAvg] = useState(null);

	useEffect(() => {
		const res = calculateAvg(range);
		if (setInfo) {
			setInfo({ ...res, betSize: range?.info?.span02 });
		}
		setAvg(res);
	}, [range]);

	const handleClick = (playerOrPos, maybePos) => {
		const positionsArray = 'UTG,UTG+1,MP,MP+1,HJ,CO,BU,SB,BB'.split(',');

		// Response situations
		if (type === 'ResponseOR' || type === 'Response3Bet') {
			const player = playerOrPos;
			const pos = maybePos;
			let indexYP = positionsArray.indexOf(yourPosition);
			let indexVP = positionsArray.indexOf(villainPosition);

			if (player === 'you') {
				setYourPosition(pos);
				indexYP = positionsArray.indexOf(pos);
				if (positionsArray.indexOf(pos) - 1 < indexVP) setVillainPosition('');
			} else {
				setVillainPosition(pos);
				indexVP = positionsArray.indexOf(pos);
			}

			const realYourPos = getRealPosition(indexYP, type);
			const realVillainPos = getRealPosition(indexVP, type);

			if (yourPosition && villainPosition) {
				setIsLoading(true);
				getData(type === 'ResponseOR' ? 'ROR' : 'RES3', `${realYourPos}|${realVillainPos}`).then(data => {
					setRange(data);
					setTableValues(data);
					setIsLoading(false);
				});
			}
		} else {
			const pos = playerOrPos;
			setYourPosition(pos);
			setTableValues(initialState);
			setIsLoading(true);
			getData(type === 'OpenRaise' ? 'OR' : 'ROL', pos).then(data => {
				setRange(data);
				setTableValues(data);
				setIsLoading(false);
			});
		}
	};

	useEffect(() => {
		setControlsContent(
			getPositionsComponent({
				situation: type,
				selected: yourPosition,
				yourPosition,
				villainPosition,
				onClick: handleClick
			})
		);
	}, [yourPosition, villainPosition]);

	return {
		range,
		avg,
		yourPosition,
		villainPosition
	};
}

// internal helper
function getRealPosition(index, type) {
	if (type === 'ROL') return getRealPositionROL(index);
	if (type === 'Response3Bet' || type === 'ResponseOR') return getRealPositionLong(index);
	return null;
}
