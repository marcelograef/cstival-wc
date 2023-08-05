import React, { useContext } from 'react';
import { useEffect, useState } from 'react';
import { getData } from '../../utilities';
import { calculateAvg } from '../../utilities/calculateInfo';
import { CardTable, InfoContainer } from '../index';
import './index.scss';
import MyContext from '../../context';
import { initialState } from '../../constants.js';

export const ROL = () => {
		const { tableValues, setTableValues } = useContext(MyContext);

	const [yourPosition, setYourPosition] = useState('');
	const [range, setRange] = useState({ info: {} });
	const [avg, setAvg] = useState(null);

	useEffect(() => {
		const res = calculateAvg(range);
		setAvg(res);
	}, [range]);

	const getPositions = (player = '') => {
		const positions = 'UTG-1,UTG,UTG+1,MP,MP+1,HJ,CO,BU,SB,BB';
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

						const getRealPosition = pos => {
							let realPos;
							if (pos <= 5 || pos === 8) {
								realPos = 'HJ-';
							} else if (pos === 9) {
								realPos = 'BB';
							} else {
								realPos = 'CO|BU';
							}
							return realPos;
						};

						const realYourPos = getRealPosition(indexYP);
						setTableValues(initialState);
						getData('ROL', `${realYourPos}`).then(rangeData => {
							setRange(rangeData);
							setTableValues(rangeData);
						});
					}}
				>
					{p}
				</button>
			);
		});
	};
	return (
		<div className="selector-container">
			<div className="selector-body">{getPositions()}</div>
			<div className="flex-container">
				{yourPosition && (
					<div className="row content-container">
						<CardTable />
						<InfoContainer data={{ ...range?.info, avg }} />
					</div>
				)}
			</div>
		</div>
	);
};

export default ROL;
