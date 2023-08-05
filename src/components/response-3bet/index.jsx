import React, { useContext } from 'react';
import { useEffect, useState } from 'react';
import { CardTable, InfoContainer } from '../index';
import './index.scss';

import { getData } from '../../utilities';
import { calculateAvg } from '../../utilities/calculateInfo';
import MyContext from '../../context';
import { initialState } from '../../constants.js';

export const Response3Bet = () => {

	const { tableValues, setTableValues } = useContext(MyContext);
	const [yourPosition, setYourPosition] = useState('');
	const [villainPosition, setVillainPosition] = useState('');
	const [sbAction, setSbAction] = useState('');
	const [range, setRange] = useState({ info: {} });
	const [avg, setAvg] = useState(null);

	const positions = 'UTG-1,UTG,UTG+1,MP,MP+1,HJ,CO,BU,SB,BB';
	const positionsArray = positions.split(',');

	useEffect(() => {
		const res = calculateAvg(range);
		setAvg(res);
	}, [range]);

	const getPositions = (player = '') => {
		return positionsArray.map(p => {
			let active = '';
			if (player) {
				active = yourPosition === p ? 'active' : '';
			} else {
				active = villainPosition === p ? 'active' : '';
			}

			let disabled;
			if ((!player && p.includes('UTG')) || (player && p === 'BB')) {
				disabled = true;
			} else {
				disabled =
					!player && positionsArray.indexOf(yourPosition) > positionsArray.indexOf(p) - 1 ? true : false;
			}

			return (
				<button
					className={`selector ${active}`}
					key={p}
					disabled={disabled}
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

						const realYourPos = getRealPosition(indexYP);
						const realVillainPos = getRealPosition(indexVP);
						if (!(yourPosition === 'SB' && villainPosition === 'BB')) {
							setSbAction('');
						}
						setTableValues(initialState);
						getData('RES3', `${realYourPos}|${realVillainPos}`).then(rangeData => {
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

	const getRealPosition = (pos) => {
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

	const sbVsBbOptions = () => {
		const indexYP = positionsArray.indexOf(yourPosition);
		const indexVP = positionsArray.indexOf(villainPosition);

		const realYourPos = getRealPosition(indexYP);
		const realVillainPos = getRealPosition(indexVP);

		const onClick = (action) => {
			setSbAction(action);
			setTableValues(initialState);
			getData('RES3', `${realYourPos}|${realVillainPos}|${action}`).then(rangeData => {
				setRange(rangeData);
				setTableValues(rangeData);
			});
		};
		return (
			<>
				<button
					className={`selector ${sbAction === '3Bet' ? 'active' : ''} not-circle`}
					onClick={() => onClick('3Bet')}
				>
					Respuesta a 3Bet
				</button>
				<button
					className={`selector ${sbAction === 'ROL' ? 'active' : ''} not-circle`}
					onClick={() => onClick('ROL')}
				>
					Respuesta a RoL
				</button>
			</>
		);
	};
	return (
		<div className="selector-container">
			<div className="selector-body">
				<span className="selector label">OR</span> {getPositions('you')}
			</div>
			<div className="selector-body">
				<span className="selector label">3Bet</span> {getPositions()}
			</div>
			{yourPosition === 'SB' && villainPosition === 'BB' && (
				<div className="selector-body">{sbVsBbOptions()}</div>
			)}
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

export default Response3Bet;
