// src/components/Situations/SituationHandler.js
import * as Situations from './';

const SituationHandler = ({ situation, ...props }) => {
	const Component = Situations[situation];

	console.log({situation, Component})
	if (!Component) return null;
	return <Component {...props} />;
};

export default SituationHandler;
