// src/components/Situations/OpenRaise.js
import { useRangeSituation } from '../../hooks/useRangeSituation';

const OpenRaise = ({ setControlsContent, setInfo }) => {
	useRangeSituation({
		situationKey: 'OpenRaise',
		setControlsContent,
		setInfo
	});
	return null;
};

export default OpenRaise;
