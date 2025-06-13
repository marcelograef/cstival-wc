import React, { useContext, useEffect, useState } from 'react';
import Wrapper from '../../../layouts/Wrapper/index.js';
import CardTable from '../../PokerTable/index.js';
import SituationHandler from '../../Situations/SituationHandler.js';
import situationComponents from '../../Situations/situationComponent.js';
import { initialState } from '../../../../utils/constants/constants.js';
import { RENDER_TABS, ADMIN_TABS, STACK_SIZES } from '../../../../utils/constants/tabs.js';
import MyContext from '../../../../context/context.js';
import './index.scss';

import { colors } from '../../../../assets/styles/colors.js';

const Home = ({ user }) => {
	const { setTableValues, isLoading } = useContext(MyContext);
	const [stack, setStack] = useState('100');
	const [selectedTab, setSelectedTab] = useState(RENDER_TABS[0]);
	const [selectedPositions, setSelectedPositions] = useState('');
	const [controls, setControlsContent] = useState(null);
	const [notes, setNotes] = useState(null);

	const renderTabs = [...RENDER_TABS, ...(user === 'mgraef' ? ADMIN_TABS : [])];

	const onClick = tab => {
		setSelectedTab(tab);
		setTableValues(initialState);
		setSelectedPositions('');
		setControlsContent(null);
		setNotes(null);
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
							role="tab"
							aria-selected={selectedTab.layout === tab.layout}
							tabIndex={0}
						>
							{tab.label}
						</div>
					))}
				</nav>

				<section className="controls-section">
					{selectedTab.onlyTable && (
						<div className="stack-sizes">
							{STACK_SIZES.map(({ value, label }) => (
								<div
									key={value}
									className={`stack-btn ${stack === value ? 'active' : ''}`}
									data-stack={value}
									onClick={onChangeStack}
									role="button"
									tabIndex={0}
									aria-pressed={stack === value}
								>
									{label}
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
							{notes?.notesObject?.span01}
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

				<section className="legend" role="complementary" aria-label="Legend">
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

				<section className="stats" role="complementary" aria-label="Statistics">
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
