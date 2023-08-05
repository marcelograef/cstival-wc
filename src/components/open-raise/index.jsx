import React, { useEffect, useState, useContext } from 'react';
import { getData } from '../../utilities';
import { calculateAvg } from '../../utilities/calculateInfo';
import { CardTable, InfoContainer } from '../index';
import './index.scss';
import MyContext from '../../context';
import { initialState } from '../../constants.js';

const OpenRaise = () => {
	const { tableValues, setTableValues } = useContext(MyContext);
	const [avg, setAvg] = useState(null);

	const [selected, setSelected] = useState('');
	const [range, setRange] = useState(initialState);

	useEffect(() => {
		const res = calculateAvg(range);
		setAvg(res);
	}, [range]);

	const getPositions = () => {
		const positions = 'UTG-1,UTG,UTG+1,MP,MP+1,HJ,CO,BU,SB';
		return positions.split(',').map(p => (
			<button
				className={`selector ${p === selected ? 'active' : ''}`}
				key={p}
				onClick={() => {
					setTableValues(initialState);

					getData('OR', p).then(rangeData => {
						setRange(rangeData);

						setTableValues(rangeData);
						setSelected(p);
					});
				}}
			>
				{p}
			</button>
		));
	};

	return (
		<div className="selector-container">
			<div className="selector-body">{getPositions()}</div>
			<div className="flex-container">
				<div className="row content-container">
					{selected && (
						<>
							<CardTable />
							<InfoContainer data={{ ...range?.info, avg }} />
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default OpenRaise;
