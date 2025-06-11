import React from 'react';

const PositionControlBuilder = ({ positions, selected, onSelect, disabledLogic = () => false }) => {
	return (
		<div className="position-group">
			{positions.map((pos, i) => (
				<button
					key={i}
					className={`position-btn ${selected === pos ? 'active' : ''}`}
					onClick={() => onSelect(pos)}
					disabled={disabledLogic(pos)}
				>
					{pos.toUpperCase()}
				</button>
			))}
		</div>
	);
};

export default PositionControlBuilder;
