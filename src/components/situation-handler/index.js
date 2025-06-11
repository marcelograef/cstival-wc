// components/SituationHandler.jsx
import React from 'react';
import { useOpenRaise } from '../../hooks/useOpenRaise';
import { useROL } from '../../hooks/useROL';
import { useResponseOR } from '../../hooks/useResponseOR';
import { useResponse3Bet } from '../../hooks/useResponse3Bet';

const SituationHandler = ({ situation, setControlsContent, setInfo }) => {
	const hookMap = {
		OpenRaise: () => useOpenRaise({ setControlsContent, setInfo }),
		ROL: () => useROL({ setControlsContent }),
		ResponseOR: () => useResponseOR({ setControlsContent }),
		Response3Bet: () => useResponse3Bet({ setControlsContent })
	};

	// Call all hooks unconditionally
	const hookRunners = {
		OpenRaise: () => {},
		ROL: () => {},
		ResponseOR: () => {},
		Response3Bet: () => {}
	};

	// Run the selected one
	if (hookMap[situation]) {
		hookMap[situation]();
	}

	return null;
};

export default SituationHandler;
