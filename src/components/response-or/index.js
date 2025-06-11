import React, { useContext } from 'react';
import { useEffect, useState } from 'react';

import { getData, getRealPositionLong } from '../../utilities';
import { CardTable, InfoContainer } from '../index';
//import { ranges } from './ranges';
import { calculateAvg } from '../../utilities/calculateInfo';
import './index.scss';
import MyContext from '../../context';
import { initialState } from '../../constants.js';

import { getPositionsComponent } from '../../utilities/getPositionsComponent';


export const ResponseOR = ({ setControlsContent }) => {
	const { tableValues, setTableValues } = useContext(MyContext);
	const [avg, setAvg] = useState(null);
	const [range, setRange] = useState({ info: {} });
	const [isLoading, setIsLoading] = useState(false);

	const [realYourPos, setRealYourPos] = useState(null);
	const [realVillainPos, setRealVillainPos] = useState(null);

	const [yourPosition, setYourPosition] = useState('');
	const [villainPosition, setVillainPosition] = useState('');

	useEffect(() => {
		const res = calculateAvg(range);
		setAvg(res);
	}, [range]);

	const getPositions = (player = '') => {
		const positions = 'UTG,UTG+1,MP,MP+1,HJ,CO,BU,SB,BB';
		const positionsArray = positions.split(',');
		return positionsArray.map((p, i) => {
			let active = '';
			if (player) {
				active = yourPosition === p ? 'active' : '';
			} else {
				active = villainPosition === p ? 'active' : '';
			}

			return (
				<>
					<div
						key={i}
						className={`position-btn ${active}`}
						data-opener={p}
						key={p}
						disabled={
							player && positionsArray.indexOf(p) - 1 < positionsArray.indexOf(villainPosition)
								? true
								: false
						}
						onClick={() => handleClick(player, p)}
					>
						{p.toUpperCase()}
					</div>
					{/* <button
						className={`selector ${active}`}
						key={p}
						disabled={
							player && positionsArray.indexOf(p) - 1 < positionsArray.indexOf(villainPosition)
								? true
								: false
						}
						onClick={() => {
							let indexYP = positionsArray.indexOf(yourPosition);
							let indexVP = positionsArray.indexOf(villainPosition);
							if (player === 'you') {
								setYourPosition(p);
								indexYP = positionsArray.indexOf(p);
								if (positionsArray.indexOf(p) - 1 < indexVP) setVillainPosition('');
							} else {
								setVillainPosition(p);
								indexVP = positionsArray.indexOf(p);
							}

							setRealYourPos(getRealPositionLong(indexYP));

							setRealVillainPos(getRealPositionLong(indexVP));
						}}
					>
						{p}
					</button> */}
				</>
			);
		});
	};

	const handleClick = (player, p) => {
		const positions = 'UTG,UTG+1,MP,MP+1,HJ,CO,BU,SB,BB';
		const positionsArray = positions.split(',');
		let indexYP = positionsArray.indexOf(yourPosition);
		let indexVP = positionsArray.indexOf(villainPosition);

		if (player === 'you') {
			setYourPosition(p);
			indexYP = positionsArray.indexOf(p);
			if (positionsArray.indexOf(p) - 1 < indexVP) setVillainPosition('');
		} else {
			setVillainPosition(p);
			indexVP = positionsArray.indexOf(p);
		}

		setRealYourPos(getRealPositionLong(indexYP));

		setRealVillainPos(getRealPositionLong(indexVP));
	};

	useEffect(() => {
		/* setControlsContent(
			<>
				<div className="position-group">{getPositions()}</div>
				<div className="vs-label">vs</div>
				<div className="position-group">{getPositions('you')}</div>
			</>
		); */

		setControlsContent(
			getPositionsComponent({
				situation: 'ResponseOR',

				yourPosition,
				villainPosition,
				onClick: handleClick
			})
		);


	}, [villainPosition, yourPosition]);

	useEffect(() => {
		setTableValues(initialState);

		if (yourPosition === '' || villainPosition === '') return;
		setIsLoading(true);

		getData('ROR', `${realYourPos}|${realVillainPos}`).then(rangeData => {
			setRange(rangeData);
			setTableValues(rangeData);
			setIsLoading(false);
		});
	}, [yourPosition, realVillainPos]);


};

export default ResponseOR;
