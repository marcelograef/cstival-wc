// src/hooks/useRangeSituation.js
import { useEffect, useState, useContext } from 'react';
import { getData } from '../utilities';
import { calculateAvg } from '../utilities/calculateInfo';
import { getPositionsComponent } from '../utilities/getPositionsComponent';
import MyContext from '../context';
import { initialState } from '../constants';

export function useRangeSituation({ situationKey, setControlsContent, setInfo }) {
	const { setTableValues, setIsLoading } = useContext(MyContext);
	const [selected, setSelected] = useState('');
	const [range, setRange] = useState(initialState);

	useEffect(() => {
		if (!range?.info) return;
		const avg = calculateAvg(range);
		setInfo?.({ ...avg, betSize: range?.info?.span02 });
	}, [range]);

	const handleClick = pos => {
		if (!pos) return;
		setIsLoading(true);
		setTableValues(initialState);
		getData(situationKey, pos).then(data => {

			console.log({data})
			setRange(data);
			setTableValues(data);
			setSelected(pos);
			setIsLoading(false);
		});
	};

	useEffect(() => {
		setControlsContent(
			getPositionsComponent({
				situation: situationKey,
				selected,
				onClick: handleClick
			})
		);
	}, [selected]);
}
