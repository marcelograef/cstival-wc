// src/hooks/useRangeSituation.js
import { useEffect, useState, useContext, useCallback } from 'react';
import { getData } from '../utilities';
import { calculateAvg } from '../utilities/calculateInfo';
import { PositionsComponent } from './PositionsComponent';
import MyContext from '../context';
import { initialState } from '../constants';

export function useRangeSituation({
	situationType,
	setControlsContent,
	effectiveStack,
	setInfo,
	playerType,
	yourPosition,
	villainPosition,
	setSelectedPositions
}) {
	const { setTableValues, setIsLoading } = useContext(MyContext);
	const [selected, setSelected] = useState('');
	const [range, setRange] = useState(initialState);

	useEffect(() => {
		if (!range?.info) return;
		const avg = calculateAvg(range);
		setInfo?.({ ...avg, betSize: range?.info?.span02 });
	}, [range, setInfo]);

	const handleClick = useCallback(
		pos => {
			if (!pos) return;
			setIsLoading(true);
			setTableValues(initialState);
			setSelectedPositions(pos);
			getData(situationType, pos, effectiveStack).then(data => {
				console.log({ data });
				setRange(data);
				setTableValues(data);
				setSelected(pos);
				setIsLoading(false);
			});
		},
		[situationType, effectiveStack, setIsLoading, setSelectedPositions, setTableValues]
	);

	useEffect(() => {
		setControlsContent(
			<PositionsComponent
				situation={situationType}
				selected={selected}
				onClick={handleClick}
				yourPosition={yourPosition}
				villainPosition={villainPosition}
			/>
		);
	}, [situationType, effectiveStack, selected, yourPosition, villainPosition, handleClick, setControlsContent]); // << Make sure this re-renders on change
}
