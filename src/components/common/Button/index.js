import React from 'react';
import './index.scss';

const Button = props => {
	const { type, children, className, onClick, ...rest } = props;
	const classes = className ? className.split(' ') : [''];
	const classNames = ['c-btn', ...classes].join(' ');

	return (
		<button className={classNames} type={type} onClick={onClick} {...rest}>
			{children}
		</button>
	);
};

export default Button;
