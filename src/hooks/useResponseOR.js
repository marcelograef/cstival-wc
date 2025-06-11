// hooks/useResponseOR.js
import { useEffect, useState, useContext } from 'react';
import { getData } from '../utilities';
import { getRealPositionLong } from '../utilities';
import { getPositionsComponent } from '../utilities/getPositionsComponent';
import { calculateAvg } from '../utilities/calculateInfo';
import { initialState } from '../constants';
import MyContext from '../context';

export const useResponseOR = ({ setControlsContent }) => {
	const { setTableValues, setIsLoading } = useContext(MyContext);
	const [yourPosition, setYourPosition] = useState('');
	const [villainPosition, setVillainPosition] = useState('');
	const [range, setRange] = useState(initialState);

	const handleClick = (player, pos) => {
		const positions = 'UTG,UTG+1,MP,MP+1,HJ,CO,BU,SB,BB'.split(',');
		if (player === 'you') {
			setYourPosition(pos);
			if (positions.indexOf(pos) - 1 < positions.indexOf(villainPosition)) {
				setVillainPosition('');
			}
		} else {
			setVillainPosition(pos);
		}
	};

	useEffect(() => {
		if (!yourPosition || !villainPosition) return;
		const positions = 'UTG,UTG+1,MP,MP+1,HJ,CO,BU,SB,BB'.split(',');
		const realYP = getRealPositionLong(positions.indexOf(yourPosition));
		const realVP = getRealPositionLong(positions.indexOf(villainPosition));
		setIsLoading(true);
		setTableValues(initialState);
		getData('ROR', `${realYP}|${realVP}`).then(data => {
			setRange(data);
			setTableValues(data);
			setIsLoading(false);
		});
	}, [yourPosition, villainPosition]);

	useEffect(() => {
		setControlsContent(
			getPositionsComponent({
				situation: 'ResponseOR',
				yourPosition,
				villainPosition,
				onClick: handleClick
			})
		);
	}, [yourPosition, villainPosition]);
};
