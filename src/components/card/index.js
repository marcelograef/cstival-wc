import React from 'react';
import './index.scss';
import { getRangeCellStyle } from '../../utilities/calculateColor';
import ActionBreakdown from './ActionBreakdown';

const Card = ({ children, suited, action = [], onMouseEnter, actionToAdd, isActive, onActivate }) => {
	const {
		allIn = 0,
		raise = 0,
		call = 0,
		fold = 0
	} = action.reduce((acc, item) => {
		acc[item] = (1 / action.length) * 100;
		return acc;
	}, {});

	const style = getRangeCellStyle({ allIn, raise, call, fold });

	const actions = { allIn, raise, call, fold, allInBet: '', raiseBet: '', callBet: '', foldBet: '' };

	if (actionToAdd) {
		style.cursor = 'pointer';
	}

	return (
		<div
			className={`hand ${suited ? 'suited' : ''} ${action.join('-100 ')} ${isActive ? 'rtc_active' : ''}`}
			style={style}
			onMouseEnter={onMouseEnter}
			onClick={onActivate}
		>
			<div className="rtc_title">{children}</div>
			{isActive && (
				<div className="tooltip">
					<ActionBreakdown actions={actions} style={style}>
						{children}
					</ActionBreakdown>
				</div>
			)}
		</div>
	);
};

export default Card;
