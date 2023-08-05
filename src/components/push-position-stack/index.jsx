import React, { useContext } from 'react';
import { CardTable, InfoContainer } from '../index';

import { forwardRef, useEffect, useRef, useState } from 'react';
import { getData } from '../../utilities';
import { calculateAvg } from '../../utilities/calculateInfo';
import './index.scss';
import { ranges } from './ranges';
import MyContext from '../../context';
import { initialState } from '../../constants.js';

export const PushPositionStack = () => {
	const { tableValues, setTableValues } = useContext(MyContext);

	const [yourPosition, setYourPosition] = useState('');
	const [selectedCell, setSelectedCell] = useState({ row: '', column: '' });
	const [flatRanges, setFaltRanges] = useState([]);
	const [flatSelected, setFlatSelected] = useState(-1);

	const [bbsSelected, setBbsSelected] = useState('');
	const [positionSelected, setPositionSelected] = useState('');

	const [range, setRange] = useState({ info: {} });
	const [avg, setAvg] = useState(null);

	useEffect(() => {
		const res = calculateAvg(range);
		setAvg(res);
	}, [range]);

	const positions = 'UTG,UTG+1,MP,MP+1,HJ,CO,BU,SB';
	const bbs = 20;
	const positionsArray = positions.split(',');

	const getPositions = () => {
		return positionsArray.map(p => {
			const active = yourPosition === p ? 'active' : '';

			return (
				<button
					className={`selector ${active}`}
					key={p}
					onClick={() => {
						let indexYP = positionsArray.indexOf(yourPosition);
						setYourPosition(p);
						indexYP = positionsArray.indexOf(p);

						const getRealPosition = pos => {
							let realPos;
							if (pos <= 5 || pos === 8) {
								realPos = 'HJ';
							} else if (pos === 9) {
								realPos = 'BB';
							} else {
								realPos = 'CO|BU';
							}
							return realPos;
						};

						const realYourPos = getRealPosition(indexYP);

						/* dispatch({
							type: LOAD_TABLE,
							payload: ranges[`${realYourPos}`]
						}); */
						setTableValues(ranges[`${realYourPos}`]);
					}}
				>
					{p}
				</button>
			);
		});
	};

	const Grid = forwardRef(({ className, children }, ref) => (
		<div ref={ref} className={`table-position-bb ${className}`}>
			{children}
		</div>
	));
	const gridElement = useRef(null);

	const gridHoveredCellDataAddressAtt = 'data-hovered-cell-address';
	const gridSelectedCellDataAddressAtt = 'data-selected-cell-address';
	const cellDataAddressRow = 'data-row';
	const cellDataAddressCol = 'data-column';

	const updateHoveredCellAddress = cellElement => {
		const dataAddress = `R${cellElement.getAttribute(cellDataAddressRow)}C${cellElement.getAttribute(
			cellDataAddressCol
		)}`;
		if (dataAddress && gridElement) {
			gridElement?.current.setAttribute(gridHoveredCellDataAddressAtt, dataAddress);
		}
	};

	const removeHoveredCellAddress = () => {
		gridElement && gridElement?.current.removeAttribute(gridHoveredCellDataAddressAtt);
	};

	const onMouseOver = event => {
		if (gridElement?.current) {
			updateHoveredCellAddress(event.currentTarget);
		}
	};

	const onMouseOut = event => {
		if (gridElement?.current) {
			removeHoveredCellAddress();
		}
	};

	const onClick = event => {
		event.preventDefault();

		const cellElement = event.currentTarget;
		const row = cellElement.getAttribute(cellDataAddressRow);
		const column = cellElement.getAttribute(cellDataAddressCol);

		const dataAddress = `R${row}C${column}`;
		if (dataAddress && gridElement) {
			setSelectedCell({ row, column });
			setPositionSelected(positionsArray[row - 1]);
			setBbsSelected(column);
		}

		let text = event.target.innerText;
		const [pos, bbs] = text.split('-');
		const situation = `${pos.replace('+', '').replace(/\s/, '')}|${bbs.trim()}BB`;

		let flag = false;
		const auxRanges = [];
		[...positionsArray, 'BB'].forEach(p => {
			if (flag) {
				auxRanges.push(`F-${p}|${pos.trim().replace('+', '')}|${bbs.trim()}BB`);
			}
			if (p === pos.trim()) {
				flag = true;
			}
		});
		setFaltRanges(auxRanges);
		setFlatSelected(-1);
		setTableValues(initialState)

		getData('PUSH', situation).then(rangeData => {
			setRange(rangeData);
			setTableValues(rangeData)

		});
	};

	const handleSelection = event => {
		console.log({ event });
		const {
			value,
			dataset: { target }
		} = event.target;
		console.log({ target });
		console.log({ value });

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
	};

	useEffect(() => {
		console.log({ positionSelected, bbsSelected });
		if (bbsSelected && positionSelected) {
			setSelectedCell({ row: positionsArray.indexOf(positionSelected) + 1, column: bbsSelected });
			const situation = `${positionSelected.replace('+', '')}|${bbsSelected}BB`;
			getData('PUSH', situation).then(rangeData => {
				setRange(rangeData);
				setTableValues(rangeData)

			});
		}
	}, [positionSelected, bbsSelected]);

	const loadRange = (rangeSelector, index) => {
		setTableValues(initialState);
		setFlatSelected(index);
		getData('PUSH', rangeSelector.replace('+', '').replace(/\s/, '')).then(rangeData => {
			setRange(rangeData);
			setTableValues(rangeData);
		});
	};

	const renderTable = () => {
		const cells = [];

		['', ...positionsArray].forEach((current, index, array) => {
			if (current === '') {
				cells.push(
					<div>
						<div className="gridHeader">
							<div className="diagonal"></div>
							<div>
								<span>BBs</span>
							</div>
							<div>
								<span>Pos</span>
							</div>
							<div className="diagonal"></div>
						</div>
					</div>
				);
			} else {
				cells.push(
					<div data-column="0" data-row={index}>
						{current}
					</div>
				);
			}
			for (let i = bbs; i >= 2; i--) {
				if (current === '') {
					cells.push(
						<div
							data-column={i}
							data-row="0"
							onMouseOver={onMouseOver}
							onMouseOut={onMouseOut}
						>{`${i}`}</div>
					);
				} else if (index < 6 && i > 15) {
					cells.push(
						<div data-row={index} data-column={i} onMouseOver={onMouseOver} onMouseOut={onMouseOut}></div>
					);
				} else {
					cells.push(
						<div
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
	};

	const renderSelector = () => {
		return (
			<>
				<div className="selector-push">
					<span>BBs</span>
					<div>
						{Array.from({ length: 19 }, (x, i) => i + 2)
							.reverse()
							.map(i => (
								<button
									data-target="BB"
									className={i === bbsSelected ? 'active' : ''}
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
						{positionsArray.map(p => (
							<button
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
		);
	};
	return (
		<div className="selector-container">
			<div>{renderSelector()}</div>
			<div className="selector-body-push">{renderTable()}</div>
			<div className="flex-container">
				<div className="row content-container">
					<>
						<CardTable />
						<InfoContainer data={{ ...range?.info, avg }} />
						{flatRanges.length > 0 && (
							<div className="flat-container">
								<div className="flat-title">Flat</div>
								{flatRanges.map((rangeText, index) => {
									const text = rangeText.split('-')[1].split('|')[0];
									return (
										<div
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
