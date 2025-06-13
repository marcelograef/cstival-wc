import React, {
	useContext,
	useCallback,
	useMemo,
	forwardRef,
	useEffect,
	useRef,
	useState
} from 'react';
import { CardTable } from '../../features/PokerTable/index.js';
import InfoContainer from '../../features/InfoContainer/index.js';
import { initialState } from '../../../utils/constants/constants.js';
import MyContext from '../../../context/context.js';
import { getData } from '../../../services/api/api-requests.js';
import { calculateAvg } from '../../../utils/calculations/calculateInfo.js';
import './index.scss';

// Constants
const POSITIONS = 'UTG,UTG+1,MP,MP+1,HJ,CO,BU,SB';
const MAX_BBS = 20;
const POSITIONS_ARRAY = POSITIONS.split(',');

// Custom hook for grid cell interactions
const useGridCellInteractions = (gridElement) => {
	const gridHoveredCellDataAddressAtt = 'data-hovered-cell-address';
	const cellDataAddressRow = 'data-row';
	const cellDataAddressCol = 'data-column';

	const updateHoveredCellAddress = useCallback((cellElement) => {
		const dataAddress = `R${cellElement.getAttribute(cellDataAddressRow)}C${cellElement.getAttribute(
			cellDataAddressCol
		)}`;
		if (dataAddress && gridElement?.current) {
			gridElement.current.setAttribute(gridHoveredCellDataAddressAtt, dataAddress);
		}
	}, [gridElement]);

	const removeHoveredCellAddress = useCallback(() => {
		gridElement?.current?.removeAttribute(gridHoveredCellDataAddressAtt);
	}, [gridElement]);

	const onMouseOver = useCallback((event) => {
		if (gridElement?.current) {
			updateHoveredCellAddress(event.currentTarget);
		}
	}, [gridElement, updateHoveredCellAddress]);

	const onMouseOut = useCallback(() => {
		if (gridElement?.current) {
			removeHoveredCellAddress();
		}
	}, [gridElement, removeHoveredCellAddress]);

	return { onMouseOver, onMouseOut };
};

// Custom hook for range data management
const useRangeData = (positionSelected, bbsSelected, setTableValues) => {
	const [isLoading, setIsLoading] = useState(false);
	const [range, setRange] = useState({ info: {} });
	const [avg, setAvg] = useState(null);
	const [flatRanges, setFlatRanges] = useState([]);
	const [flatSelected, setFlatSelected] = useState(-1);

	useEffect(() => {
		const res = calculateAvg(range);
		setAvg(res);
	}, [range]);

	useEffect(() => {
		if (bbsSelected && positionSelected) {
			let flag = false;
			const auxRanges = [];
			[...POSITIONS_ARRAY, 'BB'].forEach(p => {
				if (flag) {
					auxRanges.push(`F-${p}|${positionSelected.trim().replace('+', '')}|${bbsSelected.trim()}BB`);
				}
				if (p === positionSelected.trim()) {
					flag = true;
				}
			});
			setFlatRanges(auxRanges);
			setFlatSelected(-1);

			const situation = `${positionSelected.replace('+', '')}|${bbsSelected}BB`;
			setIsLoading(true);
			getData('PUSH', situation, '100bb').then(rangeData => {
				setRange(rangeData);
				setTableValues(rangeData);
				setIsLoading(false);
			});
		}
	}, [positionSelected, bbsSelected, setTableValues]);

	const loadRange = useCallback((rangeSelector, index) => {
		setTableValues(initialState);
		setFlatSelected(index);

		setIsLoading(true);
		getData('PUSH', rangeSelector.replace('+', '').replace(/\s/, ''), '100bb').then(rangeData => {
			setRange(rangeData);
			setTableValues(rangeData);
			setIsLoading(false);
		});
	}, [setTableValues]);

	return {
		isLoading,
		range,
		avg,
		flatRanges,
		flatSelected,
		loadRange
	};
};

// Grid Component
const Grid = forwardRef(({ className, children }, ref) => (
	<div ref={ref} className={`table-position-bb ${className}`}>
		{children}
	</div>
));

const PushPositionStack = () => {
	const { setTableValues } = useContext(MyContext);
	const gridElement = useRef(null);
	const [selectedCell, setSelectedCell] = useState({ row: '', column: '' });
	const [bbsSelected, setBbsSelected] = useState('');
	const [positionSelected, setPositionSelected] = useState('');

	const { onMouseOver, onMouseOut } = useGridCellInteractions(gridElement);
	const {
		isLoading,
		range,
		avg,
		flatRanges,
		flatSelected,
		loadRange
	} = useRangeData(positionSelected, bbsSelected, setTableValues);

	const handleSelection = useCallback((event) => {
		const {
			value,
			dataset: { target }
		} = event.target;

		switch (target) {
			case 'BB':
				setBbsSelected(value);
				break;
			case 'POS':
				setPositionSelected(value);
				break;
			default:
				break;
		}
	}, []);

	const handleSliderChange = useCallback((event) => {
		const {
			value,
			dataset: { target }
		} = event.target;

		switch (target) {
			case 'BB':
				setBbsSelected(value);
				break;
			case 'POS':
				setPositionSelected(value);
				break;
			default:
				break;
		}
	}, []);

	const onClick = useCallback((event) => {
		event.preventDefault();

		const cellElement = event.currentTarget;
		const row = parseInt(cellElement.getAttribute('data-row'));
		const column = parseInt(cellElement.getAttribute('data-column'));

		if (row === 0 || column === 0) return;

		const pos = POSITIONS_ARRAY[row - 1];
		const bbs = column;

		if (pos && bbs) {
			setSelectedCell({ row, column });
			setPositionSelected(pos);
			setBbsSelected(bbs.toString());
		}
	}, []);

	const renderTable = useMemo(() => {
		const cells = [];

		['', ...POSITIONS_ARRAY].forEach((current, index) => {
			if (current === '') {
				cells.push(
					<div key="header">
						<div className="gridHeader">
							<div className="diagonal"></div>
							<div><span>BBs</span></div>
							<div><span>Pos</span></div>
							<div className="diagonal"></div>
						</div>
					</div>
				);
			} else {
				cells.push(
					<div key={`pos-${index}`} data-column="0" data-row={index}>
						{current}
					</div>
				);
			}

			for (let i = MAX_BBS; i >= 2; i--) {
				if (current === '') {
					cells.push(
						<div
							key={`bb-${i}`}
							data-column={i}
							data-row="0"
							onMouseOver={onMouseOver}
							onMouseOut={onMouseOut}
						>{`${i}`}</div>
					);
				} else if (index < 6 && i > 15) {
					cells.push(
						<div
							key={`empty-${index}-${i}`}
							data-row={index}
							data-column={i}
							onMouseOver={onMouseOver}
							onMouseOut={onMouseOut}
						></div>
					);
				} else {
					cells.push(
						<div
							key={`cell-${index}-${i}`}
							data-row={index}
							data-column={i}
							onMouseOver={onMouseOver}
							onMouseOut={onMouseOut}
							onClick={onClick}
							className={
								`${index}` === `${selectedCell.row}` && `${i}` === `${selectedCell.column}`
									? 'selected'
									: ''
							}
						>{`${current} - ${i}`}</div>
					);
				}
			}
		});

		return <Grid ref={gridElement}>{cells}</Grid>;
	}, [selectedCell, onMouseOver, onMouseOut, onClick]);

	const renderSelector = useMemo(() => (
		<>
			<div className="selector-push">
				<span>BBs</span>
				<span>{bbsSelected || ''}</span>
				<div className="slider-container">
					<input
						type="range"
						min="2"
						max="20"
						value={bbsSelected}
						className="slider"
						id="myRange"
						onChange={handleSliderChange}
						data-target="BB"
					/>
				</div>
				<div className="buttons-selector">
					{Array.from({ length: 19 }, (_, i) => i + 2).map(i => (
						<button
							key={`bb-${i}`}
							data-target="BB"
							className={i === parseInt(bbsSelected) ? 'active' : ''}
							onClick={handleSelection}
							value={i}
						>
							{i}
						</button>
					))}
				</div>
			</div>
			<div className="selector-push">
				<span>Position</span>
				<div>
					{POSITIONS_ARRAY.map(p => (
						<button
							key={`pos-${p}`}
							data-target="POS"
							className={p === positionSelected ? 'active' : ''}
							onClick={handleSelection}
							value={p}
						>
							{p}
						</button>
					))}
				</div>
			</div>
		</>
	), [bbsSelected, positionSelected, handleSelection, handleSliderChange]);

	return (
		<div className="selector-container">
			<div>{renderSelector}</div>
			<div className="selector-body-push">{renderTable}</div>
			<div className="flex-container">
				<div className="row content-container">
					<>
						<CardTable isLoading={isLoading} />
						<InfoContainer data={{ ...range?.info, avg }} />
						{flatRanges.length > 0 && (
							<div className="flat-container">
								<div className="flat-title">Flat</div>
								{flatRanges.map((rangeText, index) => {
									const text = rangeText.split('-')[1].split('|')[0];
									return (
										<div
											key={`flat-${index}`}
											className={`flat-option ${flatSelected === index ? 'selected' : ''}`}
											onClick={() => loadRange(rangeText, index)}
										>
											{text}
										</div>
									);
								})}
							</div>
						)}
					</>
				</div>
			</div>
		</div>
	);
};

export default PushPositionStack;
