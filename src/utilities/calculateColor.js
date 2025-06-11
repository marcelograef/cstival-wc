export function getRangeCellStyle({ allIn = 0, raise = 0, call = 0, fold = 0 }) {
	const colorMap = {
		allIn: 'rgb(125, 31, 31)',
		raise: 'rgb(240, 60, 60)',
		call: 'rgb(90, 185, 102)',
		fold: 'rgb(61, 124, 184)'
	};

	let layers = [];

	if (allIn > 0) layers.push({ color: colorMap.allIn, percent: allIn });
	if (raise > 0) layers.push({ color: colorMap.raise, percent: raise });
	if (call > 0) layers.push({ color: colorMap.call, percent: call });
	if (fold > 0) {
		layers.push({ color: colorMap.fold, percent: fold });
	} else {
		layers.push({ color: colorMap.fold, percent: 100 });
	}

	const backgroundImage = layers.map(layer => `linear-gradient(to right, ${layer.color}, ${layer.color})`).join(',');

	let offset = 0;
	const backgroundSize = layers
		.map(layer => {
			const pos = `${offset + layer.percent}% 100%`;
			offset += layer.percent;
			return pos;
		})
		.join(',');

	return {
		backgroundImage,
		backgroundSize,

		backgroundRepeat: 'no-repeat'
	};
}
