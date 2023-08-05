import React from 'react';

import './index.scss';

export const Wrapper = ({ children, className }) => {
	const classes = ['o-wrapper'];

	if (className) {
		classes.push(className);
	}

	return (
		<div className={classes.join(' ')}>
			<main className="o-main">{children}</main>
		</div>
	);
};

export default Wrapper;
