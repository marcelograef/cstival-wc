// src/components/Situations/SituationHandler.js

import {useEffect} from 'react';
import GenericSituation from './GenericSituation';

const situationMap = {
	OpenRaise: 'OR',
	ResponseOR: 'ROR',
	Response3Bet: 'RES3',
	ROL: 'ROL',
	PushPositionStack: 'PUSH'
};

const SituationHandler = ({ situation, effectiveStack, ...props }) => {
	useEffect(() => {
		// Only clear positions when situation type changes
		const situationType = situationMap[situation];
		if (situationType) {
			props['setSelectedPositions']('');
		}
	}, [situation]);

	useEffect(() => {
		console.log("SituationHandler",{ effectiveStack });
	}, [effectiveStack]);

	const situationType = situationMap[situation];

	if (!situationType) return null;

	return <GenericSituation situationType={situationType} effectiveStack={effectiveStack} {...props} />;
};

export default SituationHandler;
