// src/components/Situations/ResponseOR.js
import { useRangeSituation } from '../../hooks/useRangeSituation';

const ResponseOR = ({ setControlsContent, setInfo }) => {
	useRangeSituation({
		situationKey: 'ResponseOR',
		setControlsContent,
		setInfo
	});
	return null;
};

export default ResponseOR;
