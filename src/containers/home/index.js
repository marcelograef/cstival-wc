import React, { useContext, useEffect, useRef, useState } from 'react';
import {
	LoadRange,
	OpenRaise,
	PushPositionStack,
	ROL,
	Response3Bet,
	ResponseOR,
	Wrapper,
	BuyInCalculator,
	CardTable
} from '../../components/index.js';
import { initialState } from '../../constants.js';
import MyContext from '../../context.js';
import './index.scss';

const Home = ({ user }) => {
	const { setTableValues, isLoading } = useContext(MyContext);

	const [draw, setDraw] = useState('OR');
	const [stack, setStack] = useState('');


	const [controls, setControlsContent] = useState(null);

	const [activeCategory, setActiveCategory] = useState('openraising');

	const [info, setInfo] = useState(null);

	const [openRaiseContent, setOpenRaiseContent] = useState(null);
	const [rorContent, setRorContent] = useState(null);
	const [bet3Content, setBet3Content] = useState(null);
	const [rolContent, setRolContent] = useState(null);
	const [pushContent, setPushContent] = useState(null);


	useEffect(()=>{
		console.log({info})
	},[info])

	const onClick = (layout, category) => {
		setDraw(layout);
		setActiveCategory(category);
		setTableValues(initialState);
	};

	const renderTabs = [
		{ label: 'Open Raise', layout: 'OR', category: 'openraising' },
		{ label: 'Respuesta al OR', layout: 'ROR', category: 'respuesta-or' },
		{ label: 'Respuesta 3Bet', layout: 'RES3', category: 'respuesta-3bet' },
		{ label: 'ROL', layout: 'ROL', category: 'raise-over-limp' },
		{ label: 'Push por Stack', layout: 'PUSH', category: 'push-stack' },
		{ label: 'Calculadora Buy-In', layout: 'CALC', category: 'CALC' }
	];
	const activeTab = renderTabs.find(i => i.layout === draw);

	const userRestriction = user === 'cstival' || true;
	if (userRestriction) {
		renderTabs.push({ label: 'Load Range', layout: 'LOAD', category: 'load-range' });
	}

	return (
		<Wrapper>
			<div className="cs-container">
				<div className="header">
					<h1>Tablas de Estrategia Preflop</h1>
					<p>Herramienta Profesional de Análisis de Rangos MTT</p>
				</div>

				<div className="main-tabs">
					{renderTabs.map(({ label, layout, category }) => (
						<div
							key={layout}
							className={`main-tab ${draw === layout ? 'active' : ''}`}
							data-category={category}
							onClick={() => onClick(layout, category)}
						>
							{label}
						</div>
					))}
				</div>

				<div className="controls-section">
					<div className="stack-sizes">
						{['100bb', '60bb', '40bb', '30bb', '20bb', '15bb', '10bb'].map((s, i) => (
							<div
								key={i}
								className={`stack-btn ${i === 0 ? 'active' : ''}`}
								data-stack={s}
								onClick={() => setStack(s)}
							>
								{s} {s.includes('Push') ? '' : s === '15bb' || s === '10bb' ? 'Push' : ''}
							</div>
						))}
					</div>

					<div
						className="position-controls"
						id="openraise-controls"
						style={{ display: activeCategory === 'openraising' ? 'flex' : 'none' }}
					>
						{/** content to change fro OpenRaise*/}
						{openRaiseContent}
					</div>
					{draw === 'OR' && <OpenRaise setControlsContent={setOpenRaiseContent} setInfo={setInfo} />}
					{draw === 'ROR' && <ResponseOR setControlsContent={setRorContent} />}
					{draw === 'RES3' && <Response3Bet setControlsContent={setBet3Content} />}
					{draw === 'ROL' && <ROL setControlsContent={setRolContent} />}
					{draw === 'PUSH' && <PushPositionStack setControlsContent={setPushContent} />}
					{draw === 'CALC' && <BuyInCalculator />}
					{draw === 'LOAD' && userRestriction && <LoadRange />}

					<div
						className="position-controls"
						id="respuesta-or-controls"
						style={{ display: activeCategory === 'respuesta-or' ? 'flex' : 'none' }}
					>
						{rorContent}
					</div>

					<div
						className="position-controls"
						id="respuesta-3bet-controls"
						style={{ display: activeCategory === 'respuesta-3bet' ? 'flex' : 'none' }}
					>
						{bet3Content}
					</div>
					<div
						className="position-controls"
						id="raise-over-limp-controls"
						style={{ display: activeCategory === 'raise-over-limp' ? 'flex' : 'none' }}
					>
						{rolContent}
					</div>
				</div>
				<div class="current-selection">
					<h3 id="selection-title">
						{' '}
						{activeTab?.label} - {stack} - UTG
					</h3>
					<p id="selection-desc">Rango conservador de apertura desde Under The Gun con stacks profundos</p>
				</div>
				<div className="grid-container">
					<CardTable isLoading={isLoading} />
				</div>

				<div class="legend">
					<div class="legend-item">
						<div class="legend-color" style={{ background: '#e74c3c' }}></div>
						<span>Raise</span>
					</div>
					<div class="legend-item">
						<div class="legend-color" style={{ background: '#2ecc71' }}></div>
						<span>Call</span>
					</div>
					<div class="legend-item">
						<div class="legend-color" style={{ background: '#9b59b6' }}></div>
						<span>All-in</span>
					</div>
					<div class="legend-item">
						<div class="legend-color" style={{ background: '#3498db' }}></div>
						<span>Fold</span>
					</div>
				</div>

				<div class="stats">
					<div class="stat-item">
						<div class="stat-number">{`${info?.totalAvg}`}</div>
						<div class="stat-label">Rango de Apertura</div>
					</div>
					<div class="stat-item">
						<div class="stat-number">{`${info?.totalUsedCombos}`}</div>
						<div class="stat-label">Combos</div>
					</div>
					<div class="stat-item">
						<div class="stat-number">{`${info?.betSize?.split(':')[1]}`}</div>
						<div class="stat-label">Tamaño de Bet</div>
					</div>
				</div>
			</div>
		</Wrapper>
	);
};

export default Home;
