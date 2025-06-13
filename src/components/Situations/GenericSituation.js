// src/components/Situations/GenericSituation.js
import { useRangeSituation } from '../../hooks/useRangeSituation';

const GenericSituation = ({ situationType,effectiveStack, setControlsContent, setNotes, setSelectedPositions }) => {
	useRangeSituation({
		situationType,
		setControlsContent,
		effectiveStack,
		setNotes,
		setSelectedPositions
	});
	return null;
};

export default GenericSituation;
