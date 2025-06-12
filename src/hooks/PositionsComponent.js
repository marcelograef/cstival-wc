import React, { useState } from 'react';

// ✅ Convert to actual component
export const PositionsComponent = ({
	situation,
	positions = 'UTG,UTG+1,MP,MP+1,HJ,CO,BU,SB,BB',
	selected,
	onClick,
	yourPosition,
	villainPosition
}) => {
	const positionsArray = positions.split(',');
	const isVersus = ['ROR', 'RES3'].includes(situation);

	const [tempHero, setTempHero] = useState(yourPosition || '');
	const [tempVillain, setTempVillain] = useState(villainPosition || '');

	if (isVersus) {
		const handleClick = (isHero, pos) => {
			if (isHero) {
				setTempHero(pos);
				if (tempVillain) {
					onClick(`${pos}|${tempVillain}`);
				}
			} else {
				setTempVillain(pos);
				if (tempHero) {
					onClick(`${tempHero}|${pos}`);
				}
			}
		};

		const renderGroup = isHero =>
			positionsArray.map((pos, i) => {
				const active = isHero ? tempHero === pos : tempVillain === pos;
				const disabled =
					isHero && tempVillain && positionsArray.indexOf(pos) - 1 < positionsArray.indexOf(tempVillain);

				return (
					<div
						key={`${isHero ? 'you' : 'villain'}-${i}`}
						className={`position-btn ${active ? 'active' : ''}`}
						disabled={disabled}
						onClick={() => handleClick(isHero, pos)}
					>
						{pos.toUpperCase()}
					</div>
				);
			});

		return (
			<>
				<div className="position-group">{renderGroup(false)}</div>
				<div className="vs-label">vs</div>
				<div className="position-group">{renderGroup(true)}</div>
			</>
		);
	}

	// Basic rendering for non-versus
	return (
		<>
			{positionsArray.map((pos, i) => (
				<div
					key={i}
					className={`position-btn ${pos === selected ? 'active' : ''}`}
					data-position={pos}
					onClick={() => onClick(pos)}
				>
					{pos.toUpperCase()}
				</div>
			))}
		</>
	);
};
