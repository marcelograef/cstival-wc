import React, { useContext, useState } from 'react';


//import { LOAD_TABLE } from '../../store/enums';
import {
	CustomRange,
	OpenRaise,
	PushPositionStack,
	ROL,
	Response3Bet,
	ResponseOR,
	Wrapper
} from '../../components/index.js';
//import { useTranslation } from 'react-i18next';
import { initialState } from '../../constants.js';
import MyContext from '../../context.js';
import './index.scss';

const Home = () => {
	// const { t } = useTranslation();

	const { tableValues, setTableValues } = useContext(MyContext);

	let children;
	const [draw, setDraw] = useState(children);

	const onClick = layout => {
		setDraw(layout);

		setTableValues(initialState);
	};

	return (
		<Wrapper>
			<div className="header">
				<h1>Estrategia Preflop</h1>
				<div className="sections">
					<h4 className={`${draw === 'OR' ? 'active' : ''}`} onClick={() => onClick('OR')}>
						Open Raise
					</h4>
					<h4 className={`${draw === 'ROR' ? 'active' : ''}`} onClick={() => onClick('ROR')}>
						Respuesta vs OR
					</h4>
					<h4 className={`${draw === 'RES3' ? 'active' : ''}`} onClick={() => onClick('RES3')}>
						Respuesta 3Bet
					</h4>
					<h4 className={`${draw === 'ROL' ? 'active' : ''}`} onClick={() => onClick('ROL')}>
						ROL
					</h4>
					<h4 className={`${draw === 'PUSH' ? 'active' : ''}`} onClick={() => onClick('PUSH')}>
						Push por Pos. y Stack
					</h4>
					<h4 className={`${draw === 'CUSTOM' ? 'active' : ''}`} onClick={() => onClick('CUSTOM')}>
						Load Range
					</h4>
				</div>
			</div>
			{draw === 'OR' && <OpenRaise />}
			{draw === 'ROR' && <ResponseOR />}
			{draw === 'RES3' && <Response3Bet />}
			{draw === 'ROL' && <ROL />}
			{draw === 'PUSH' && <PushPositionStack />}
			{draw === 'CUSTOM' && <CustomRange />}

		</Wrapper>
	);
	/*return (
		<Wrapper>
			<div className="header">
				<h1>Estrategia Preflop</h1>
				<div className="sections">
					<h4 className={`${draw === 'OR' ? 'active' : ''}`} onClick={() => onClick('OR')}>
						Open Raise
					</h4>
					<h4 className={`${draw === 'ROR' ? 'active' : ''}`} onClick={() => onClick('ROR')}>
						Respuesta vs OR
					</h4>
					<h4 className={`${draw === 'RES3' ? 'active' : ''}`} onClick={() => onClick('RES3')}>
						Respuesta 3Bet
					</h4>
					<h4 className={`${draw === 'ROL' ? 'active' : ''}`} onClick={() => onClick('ROL')}>
						ROL
					</h4>
					<h4 className={`${draw === 'PUSH' ? 'active' : ''}`} onClick={() => onClick('PUSH')}>
						Push por Pos. y Stack
					</h4>
					<h4 className={`${draw === 'CUSTOM' ? 'active' : ''}`} onClick={() => onClick('CUSTOM')}>
						Load Range
					</h4>
				</div>
				{draw === 'OR' && <OpenRaise />}
				{draw === 'ROR' && <ResponseOR />}
				{draw === 'RES3' && <Response3Bet />}
				{draw === 'ROL' && <ROL />}
				{draw === 'PUSH' && <PushPositionStack />}
				{draw === 'CUSTOM' && <CustomRange />}
			</div>
		</Wrapper>
	);*/
};

export default Home;
