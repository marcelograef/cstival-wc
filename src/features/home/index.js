import React, { useContext, useState } from 'react';
import { Wrapper, CardTable } from '../../../index.js';
import SituationHandler from '../../Situations/SituationHandler.js';
import situationComponents from '../../Situations/situationComponent.js';
import { initialState } from '../../../../utils/constants/constants.js';
import MyContext from '../../context.js';
import './index.scss';

import { colors } from '../../../../assets/styles/colors.js';

const Home = ({ user }) => {
	const renderTabs = [
		{ label: 'Open Raise', layout: 'OR', category: 'openraising', situation: 'OpenRaise', onlyTable: true },
		{ label: 'Respuesta al OR', layout: 'ROR', category: 'respuesta-or', situation: 'ResponseOR', onlyTable: true },
		{
			label: 'Respuesta 3Bet',
			layout: 'RES3',
			category: 'respuesta-3bet',
			situation: 'Response3Bet',
			onlyTable: true
		},
		{ label: 'ROL', layout: 'ROL', category: 'raise-over-limp', situation: 'ROL', onlyTable: true },
		{
			label: 'Push por Stack',
			layout: 'PUSH',
			category: 'push-stack',
			situation: 'PushPositionStack',
			onlyTable: false
		},
		{
			label: 'Calculadora Buy-In',
			layout: 'CALC',
			category: 'CALC',
			situation: 'BuyInCalculator',
			onlyTable: false
		}
	];
	if (user === 'mgraef' ) {
		renderTabs.push({
			label: 'Load Range',
			layout: 'LOAD',
			category: 'load-range',
			situation: 'LoadRange',
			onlyTable: false
		});
	}

	const { setTableValues, isLoading } = useContext(MyContext);

	const [stack, setStack] = useState('100');
	const [selectedTab, setSelectedTab] = useState(renderTabs[0]);

	const [selectedPositions, setSelectedPositions] = useState('');
	const [controls, setControlsContent] = useState(null);

	const [notes, setNotes] = useState(null);

	const onClick = tab => {
		setSelectedTab(tab);
		setTableValues(initialState);
	};

	const onChangeStack = evt => {
		const stack = evt.currentTarget.dataset.stack;

		setTableValues(initialState);
		setStack(stack);
	};

	const activeTab = renderTabs.find(i => i.layout === selectedTab.layout);

	return (
		<Wrapper>
			<div className="cs-container">
				<header className="header">
					<h1>Tablas de Estrategia Preflop</h1>
					<p>Herramienta Profesional de Análisis de Rangos MTT</p>
				</header>

				<nav className="main-tabs">
					{renderTabs.map(tab => (
						<div
							key={tab.layout}
							className={`main-tab ${selectedTab.layout === tab.layout ? 'active' : ''}`}
							data-category={tab.category}
							onClick={() => onClick(tab)}
						>
							{tab.label}
						</div>
					))}
				</nav>

				<section className="controls-section">
					{selectedTab.onlyTable && (
						<div className="stack-sizes">
							{['100bb', '60bb', '40bb', '30bb', '20bb', '15bb', '10bb'].map((s, i) => (
								<div
									key={s}
									className={`stack-btn ${stack === s ? 'active' : ''}`}
									data-stack={s}
									onClick={onChangeStack}
								>
									{s} {(s === '15bb' || s === '10bb') && 'Push'}
								</div>
							))}
						</div>
					)}

					<div className="position-controls" id="situation-controls">
						<SituationHandler
							situation={selectedTab.situation}
							effectiveStack={stack}
							setSelectedPositions={setSelectedPositions}
							setControlsContent={setControlsContent}
							setNotes={setNotes}
						/>
						{selectedTab.onlyTable && controls}
					</div>
				</section>

				{selectedTab.onlyTable && (
					<section className="current-selection">
						<h3 id="selection-title">
							{activeTab?.label} - {stack} - {selectedPositions}
						</h3>
						<p id="selection-desc">
							Rango conservador de apertura desde Under The Gun con stacks profundos
						</p>
					</section>
				)}

				<div className="grid-container">
					{selectedTab.onlyTable ? (
						<CardTable isLoading={isLoading} />
					) : (
						(() => {
							const SelectedComponent = situationComponents[selectedTab.situation];
							return SelectedComponent ? <SelectedComponent /> : null;
						})()
					)}
				</div>

				<section className="legend">
					<div className="legend-item">
						<div className="legend-color" style={{ background: colors.allIn }}></div>
						<span>All-in</span>
					</div>
					<div className="legend-item">
						<div className="legend-color" style={{ background: colors.raise }}></div>
						<span>Raise</span>
					</div>
					<div className="legend-item">
						<div className="legend-color" style={{ background: colors.call }}></div>
						<span>Call</span>
					</div>
					<div className="legend-item">
						<div className="legend-color" style={{ background: colors.fold }}></div>
						<span>Fold</span>
					</div>
				</section>

				<section className="stats">
					<div className="stat-item">
						<div className="stat-number">{notes?.totalAvg}</div>
						<div className="stat-label">Rango de Apertura</div>
					</div>
					<div className="stat-item">
						<div className="stat-number">{notes?.totalUsedCombos}</div>
						<div className="stat-label">Combos</div>
					</div>
					<div className="stat-item">
						<div className="stat-number">{notes?.betSize?.split(':')[1]}</div>
						<div className="stat-label">Tamaño de Bet</div>
					</div>
				</section>
			</div>
		</Wrapper>
	);
};

export default Home;
