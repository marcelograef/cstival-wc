// BuyInCalculator.jsx
import React, { useState } from 'react';
import './index.scss'; // Asegúrate de tener un archivo BuyInCalculator.scss con tus estilos

const BuyInCalculator = () => {
	const [bankroll, setBankroll] = useState(500);

	const factors = [
		{ roi: 10, field: 100, factor: 133 },
		{ roi: 10, field: 200, factor: 200 },
		{ roi: 10, field: 1000, factor: 500 },
		{ roi: 20, field: 100, factor: 75 },
		{ roi: 20, field: 200, factor: 100 },
		{ roi: 20, field: 1000, factor: 250 },
		{ roi: 30, field: 100, factor: 45 },
		{ roi: 30, field: 200, factor: 57 },
		{ roi: 30, field: 1000, factor: 142 }
	];

	const calculateBuyIn = (roi, field) =>
		bankroll / factors.find(factor => factor.roi === roi && factor.field === field)?.factor || 0;

	const calculateAverage = factors =>
		(factors.reduce((sum, factor) => sum + calculateBuyIn(factor.roi, factor.field), 0) / factors.length).toFixed(
			1
		);

	const generateRow = roi => (
		<div className="grid-row" key={roi}>
			<div className={`roi-${roi}`}>{`${roi}%`}</div>
			{factors
				.filter(factor => factor.roi === roi)
				.map(factor => (
					<div key={factor.field}>{`$${calculateBuyIn(roi, factor.field).toFixed(1)}`}</div>
				))}
			<div className={`roi-${roi}`}>${calculateAverage(factors)}</div>
		</div>
	);

	return (
		<div className="calc-container">

				<div className='bankroll'>
					<div>BANKROLL:</div>
					<div>
						<input type="number" value={bankroll} onChange={e => setBankroll(e.target.value)} />
					</div>
				</div>
				<div className="header">
					<div>ROI</div>
					<div>Fields CHICOS (100 jug)</div>
					<div>Fields MEDIOS (200 jug)</div>
					<div>Fields GRANDES (1000 jug)</div>
					<div>Promedio (Grilla mixeada)</div>
				</div>

				<div className="grid">{[10, 20, 30].map(roi => generateRow(roi))}</div>

		</div>
	);
};

export default BuyInCalculator;
