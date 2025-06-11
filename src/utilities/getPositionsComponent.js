export const getPositionsComponent = ({
	situation,
	positions = 'UTG,UTG+1,MP,MP+1,HJ,CO,BU,SB,BB',
	selected,
	onClick,
	yourPosition,
	villainPosition
}) => {

	console.group('getPositionsComponent');
	console.log({situation,
		positions,
		selected,
		onClick,
		yourPosition,
		villainPosition})
		console.groupEnd();
	const positionsArray = positions.split(',');
	const isVersus = ['ResponseOR', 'Response3Bet'].includes(situation);

	if (isVersus) {
		const renderGroup = isHero =>
			positionsArray.map((pos, i) => {
				const active = isHero ? yourPosition === pos : villainPosition === pos;

				const disabled =
					isHero &&
					villainPosition &&
					positionsArray.indexOf(pos) - 1 < positionsArray.indexOf(villainPosition);

				const playerType = isHero ? 'you' : 'villain';

				return (
					<div
						key={`${playerType}-${i}`}
						className={`position-btn ${active ? 'active' : ''}`}
						disabled={disabled}
						onClick={() => onClick(playerType, pos)}
					>
						{pos.toUpperCase()}
					</div>
				);
			});

			console.log(
				<>
					<div className="position-group">{renderGroup(false)}</div>
					<div className="vs-label">vs</div>
					<div className="position-group">{renderGroup(true)}</div>
				</>
			);
		return (
			<>
				<div className="position-group">{renderGroup(false)}</div>
				<div className="vs-label">vs</div>
				<div className="position-group">{renderGroup(true)}</div>
			</>
		);
	}


	console.log(positionsArray.map((pos, i) => (
		<div
			key={i}
			className={`position-btn ${pos === selected ? 'active' : ''}`}
			data-position={pos}
			onClick={() => onClick(pos)}
		>
			{pos.toUpperCase()}
		</div>
	)))
	// Basic rendering for OpenRaise, ROL, etc.
	return positionsArray.map((pos, i) => (
		<div
			key={i}
			className={`position-btn ${pos === selected ? 'active' : ''}`}
			data-position={pos}
			onClick={() => onClick(pos)}
		>
			{pos.toUpperCase()}
		</div>
	));
};
