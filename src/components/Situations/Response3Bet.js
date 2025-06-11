
// src/components/Situations/Response3Bet.js
import { useRangeSituation } from '../../hooks/useRangeSituation';

const Response3Bet = ({ setControlsContent, setInfo }) => {
	useRangeSituation({
		situationKey: 'Response3Bet',
		setControlsContent,
		setInfo
	});
	return null;
};

export default Response3Bet;
