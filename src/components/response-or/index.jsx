import React, { useContext } from 'react';
import { useEffect, useState } from 'react';

import { getData } from '../../utilities';
import { CardTable, InfoContainer } from '../index';
//import { ranges } from './ranges';
import { calculateAvg } from '../../utilities/calculateInfo';
import './index.scss';
import MyContext from '../../context';
import { initialState } from '../../constants.js';

export const ResponseOR = () => {
	const { tableValues, setTableValues } = useContext(MyContext);
	const [avg, setAvg] = useState(null);
	const [range, setRange] = useState({ info: {} });

	const [yourPosition, setYourPosition] = useState('');
	const [villainPosition, setVillainPosition] = useState('');

	useEffect(() => {
		const res = calculateAvg(range);
		setAvg(res);
	}, [range]);

	const getPositions = (player = '') => {
		const positions = 'UTG-1,UTG,UTG+1,MP,MP+1,HJ,CO,BU,SB,BB';
		const positionsArray = positions.split(',');
		return positionsArray.map(p => {
			let active = '';
			if (player) {
				active = yourPosition === p ? 'active' : '';
			} else {
				active = villainPosition === p ? 'active' : '';
			}

			return (
				<button
					className={`selector ${active}`}
					key={p}
					disabled={
						player && positionsArray.indexOf(p) - 1 < positionsArray.indexOf(villainPosition) ? true : false
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

						const getRealPosition = pos => {
							let realPos;
							if (pos <= 2) {
								realPos = 'EP';
							} else if (pos <= 4) {
								realPos = 'MP';
							} else if (pos === 5) {
								realPos = 'HJ';
							} else if (pos === 6) {
								realPos = 'CO';
							} else if (pos === 7) {
								realPos = 'BU';
							} else if (pos === 8) {
								realPos = 'SB';
							} else {
								realPos = 'BB';
							}

							return realPos;
						};

						const realYourPos = getRealPosition(indexYP);
						const realVillainPos = getRealPosition(indexVP);
						setTableValues(initialState);
						getData('ROR', `${realYourPos}|${realVillainPos}`).then(rangeData => {
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
			<div className="selector-body">
				<span className="selector label">OR</span>
				{getPositions()}
			</div>
			<div className="selector-body">
				<span className="selector label">Hero</span>
				{getPositions('you')}
			</div>
			<div className="flex-container">
				{yourPosition && villainPosition && (
					<div className="row content-container">
						<CardTable />
						<InfoContainer data={{ ...range?.info, avg }} />
					</div>
				)}
			</div>
		</div>
	);
};

export default ResponseOR;
