import React, { useContext } from 'react';
import { useEffect, useState } from 'react';
import { CardTable, InfoContainer } from '../index';
import './index.scss';

import { getPositionsComponent } from '../../utilities/getPositionsComponent';


import { getData, getRealPositionLong } from '../../utilities';
import { calculateAvg } from '../../utilities/calculateInfo';
import MyContext from '../../context';
import { initialState } from '../../constants.js';

export const Response3Bet = ({ setControlsContent }) => {
	const { setTableValues } = useContext(MyContext);
	const [isLoading, setIsLoading] = useState(false);

	const [realYourPos, setRealYourPos] = useState(null);
	const [realVillainPos, setRealVillainPos] = useState(null);

	const [yourPosition, setYourPosition] = useState('');
	const [villainPosition, setVillainPosition] = useState('');
	const [sbAction, setSbAction] = useState('');
	const [range, setRange] = useState({ info: {} });
	const [avg, setAvg] = useState(null);

	const positions = 'UTG,UTG+1,MP,MP+1,HJ,CO,BU,SB,BB';
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
				<div
					className={`position-btn ${active}`}
					data-threetbet={p}
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

						setRealYourPos(getRealPositionLong(indexYP));
						setRealVillainPos(getRealPositionLong(indexVP));
					}}
				>
					{p}
				</div>
				/**
				 *
				 * <div className="position-group">
							{['utg1', 'mp', 'lj', 'hj', 'co', 'bu', 'sb', 'bb'].map((pos, i) => (
								<div key={i} className={`position-btn ${i === 0 ? 'active' : ''}`} data-threetbet={pos}>
									{pos.toUpperCase()}
								</div>
							))}
						</div>
						<div className="vs-label">vs</div>
						<div className="position-group">
							{['utg', 'utg1', 'mp', 'lj', 'hj', 'co', 'bu', 'sb'].map((pos, i) => (
								<div key={i} className={`position-btn ${i === 0 ? 'active' : ''}`} data-original={pos}>
									{pos.toUpperCase()}
								</div>
							))}
						</div>
				 */
			);
		});
	};

	const sbVsBbOptions = () => {
		const indexYP = positionsArray.indexOf(yourPosition);
		const indexVP = positionsArray.indexOf(villainPosition);

		const realYourPos = getRealPositionLong(indexYP);
		const realVillainPos = getRealPositionLong(indexVP);

		const onClick = action => {
			setSbAction(action);
			setTableValues(initialState);

			if (yourPosition === '' || realVillainPos === '') return;
			setIsLoading(true);

			getData('RES3', `${realYourPos}|${realVillainPos}|${action}`).then(rangeData => {
				setRange(rangeData);
				setTableValues(rangeData);
				setIsLoading(false);
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

	useEffect(() => {
		if (!(yourPosition === 'SB' && realVillainPos === 'BB')) {
			setSbAction('');
		}
		setTableValues(initialState);

		if (!(yourPosition === '' || realVillainPos === '')) {
			setIsLoading(true);

			getData('RES3', `${realYourPos}|${realVillainPos}`)
				.then(rangeData => {
					setRange(rangeData);
					setTableValues(rangeData);
					setIsLoading(false);
				})
				.catch(e => setIsLoading(false));
		}
	}, [yourPosition, realVillainPos]);


	const handleClick = (player, p) => {
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
		setControlsContent(
			getPositionsComponent({
				situation: 'Response3Bet',

				yourPosition,
				villainPosition,
				onClick: handleClick
			})
		);
		/* setControlsContent(
			<>
				<div className="position-group">{getPositions()}</div>
				<div className="vs-label">vs</div>
				<div className="position-group">{getPositions('you')}</div>
			</>
		); */
	}, [villainPosition, yourPosition]);

	/* return (
		<>
			<CardTable isLoading={isLoading} />
			<InfoContainer data={{ ...range?.info, avg }} />
		</>
	); */
};

export default Response3Bet;
