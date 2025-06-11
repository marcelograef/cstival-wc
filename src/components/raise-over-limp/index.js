import React, { useContext } from 'react';
import { useEffect, useState } from 'react';
import { getData, getRealPositionROL, getRealPositionShort } from '../../utilities';
import { calculateAvg } from '../../utilities/calculateInfo';
import { CardTable, InfoContainer } from '../index';
import './index.scss';
import MyContext from '../../context';
import { initialState } from '../../constants.js';

import { getPositionsComponent } from '../../utilities/getPositionsComponent';


export const ROL = ({ setControlsContent }) => {
	const { tableValues, setTableValues } = useContext(MyContext);
	const [isLoading, setIsLoading] = useState(false);

	const [realYourPos, setRealYourPos] = useState('');

	const [yourPosition, setYourPosition] = useState('');
	const [range, setRange] = useState({ info: {} });
	const [avg, setAvg] = useState(null);

	useEffect(() => {
		const res = calculateAvg(range);
		setAvg(res);
	}, [range]);

	const getPositions = (player = '') => {
		const positions = 'UTG,UTG+1,MP,MP+1,HJ,CO,BU,SB,BB';
		const positionsArray = positions.split(',');
		return positionsArray.map(p => {
			const active = yourPosition === p ? 'active' : '';

			return (
				<button
					className={`selector ${active}`}
					key={p}
					onClick={() => {
						let indexYP = positionsArray.indexOf(yourPosition);
						setYourPosition(p);
						indexYP = positionsArray.indexOf(p);

						setRealYourPos(getRealPositionROL(indexYP));
					}}
				>
					{p}
				</button>
			);
		});
	};

	const handleClick = () => {};

	useEffect(() => {
		if (realYourPos !== '') {
			setTableValues(initialState);
			setIsLoading(true);
			getData('ROL', `${realYourPos}`).then(rangeData => {
				setRange(rangeData);
				setTableValues(rangeData);
				setIsLoading(false);
			});
		}
	}, [realYourPos]);

	useEffect(() => {
		const positions = 'UTG,UTG+1,MP,MP+1,HJ,CO,BU,SB,BB';
		const positionsArray = positions.split(',');

		/* setControlsContent(
			positionsArray.map((pos, i) => {
				const active = yourPosition === pos ? 'active' : '';

				return (
					<div
						key={i}
						className={`position-btn ${pos === realYourPos ? 'active' : ''}`}
						data-position={pos}
						onClick={() => {
							let indexYP = positionsArray.indexOf(yourPosition);
							setYourPosition(pos);
							indexYP = positionsArray.indexOf(pos);

							setRealYourPos(getRealPositionROL(indexYP));
						}}
					>
						{pos.toUpperCase()}
					</div>
				);
			})
		); */
		setControlsContent(
			getPositionsComponent({
				situation: 'ROL',
				selected: yourPosition,
				onClick: pos => {
					setYourPosition(pos);
					setRealYourPos(getRealPositionROL(positionsArray.indexOf(pos)));
				}
			})
		);
	}, [realYourPos]);

};

export default ROL;
