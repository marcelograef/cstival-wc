import React, { useContext, useEffect, useState } from 'react';

//import { LOAD_TABLE } from '../../store/enums';
import {
	LoadRange,
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

const Home = ({ user }) => {
	const { tableValues, setTableValues } = useContext(MyContext);

	const [draw, setDraw] = useState('OR');

	const onClick = layout => {
		setDraw(layout);
		setTableValues(initialState);
	};

	return (
		<Wrapper>
			<div className="cs-container">
				<div className="cs-sections">
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
					{ user === 'cstival' &&
					<h4 className={`${draw === 'LOAD' ? 'active' : ''}`} onClick={() => onClick('LOAD')}>
						Load Range
					</h4>
					}
				</div>
				<div className="cs-content">
					{draw === 'OR' && <OpenRaise />}
					{draw === 'ROR' && <ResponseOR />}
					{draw === 'RES3' && <Response3Bet />}
					{draw === 'ROL' && <ROL />}
					{draw === 'PUSH' && <PushPositionStack />}
					{draw === 'LOAD' && user === 'cstival' && <LoadRange />}
				</div>
			</div>
		</Wrapper>
	);
};

export default Home;
