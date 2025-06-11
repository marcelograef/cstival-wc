// src/components/Situations/ROL.js
import { useRangeSituation } from '../../hooks/useRangeSituation';

const ROL = ({ setControlsContent, setInfo }) => {
	useRangeSituation({
		situationKey: 'ROL',
		setControlsContent,
		setInfo
	});
	return null;
};

export default ROL;
