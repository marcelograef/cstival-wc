// src/components/Situations/GenericSituation.js
import { useRangeSituation } from '../../hooks/useRangeSituation';

const GenericSituation = ({ situationType,effectiveStack, setControlsContent, setInfo, setSelectedPositions }) => {
	useRangeSituation({
		situationType,
		setControlsContent,
		effectiveStack,
		setInfo,
		setSelectedPositions
	});
	return null;
};

export default GenericSituation;
