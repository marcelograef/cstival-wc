import React from 'react';
import './index.scss';

const colors = {
	raise: 'rgba(39, 199, 18, 0.938)',
	bluff: '#f34646',
	call: 'rgb(255, 251, 0)',
	fold: 'rgba(139, 138, 138, 0.8)'
};

const Card = ({ children, suited, action, onMouseEnter, ...props }) => {
	const actionAmount = action.length;

	let formerPercentage = 0;
	const colorString = action.map((current, index) => {
		const percentage = ((index + 1) / actionAmount) * 100;
		const res = `${colors[current]} ${formerPercentage}%, ${colors[current]} ${percentage}%`;
		formerPercentage = percentage;
		return res;
	});

	const style = action.length > 0 ? { background: `linear-gradient(to right,  ${colorString.join(', ')}` } : {};
	return (
		<div
			className={`card ${suited ? 'suited' : ''} ${!!action ? action.join(' ') : ''}`}
			{...props}
			style={style}
			onMouseEnter={onMouseEnter}
		>
			{children}
		</div>
	);
};

export default Card;
