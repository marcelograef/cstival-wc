export const getRealPositionLong = pos => {
	let realPos;
	if (pos <= 1) {
		realPos = 'EP';
	} else if (pos <= 3) {
		realPos = 'MP';
	} else if (pos === 4) {
		realPos = 'HJ';
	} else if (pos === 5) {
		realPos = 'CO';
	} else if (pos === 6) {
		realPos = 'BU';
	} else if (pos === 7) {
		realPos = 'SB';
	} else {
		realPos = 'BB';
	}

	return realPos;
};

export const getRealPositionShort = pos => {
	let realPos;
	if (pos <= 1) {
		realPos = 'EP';
	} else if (pos <= 3) {
		realPos = 'MP';
	} else if (pos === 4) {
		realPos = 'HJ';
	} else if (pos === 5) {
		realPos = 'CO';
	} else if (pos === 6) {
		realPos = 'BU';
	} else if (pos === 7) {
		realPos = 'SB';
	} else {
		realPos = 'BB';
	}

	return realPos;
};
