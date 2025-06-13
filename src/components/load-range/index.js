import React, { useContext, useMemo, useCallback } from 'react';
import { useEffect, useState } from 'react';
import { getData, getRealPositionLong, getRealPositionROL, saveRange } from '../../utilities';
import { calculateAvg } from '../../utilities/calculateInfo.js';
import { Button, CardTable, Field, infoContainer } from '../index';
import './index.scss';
import '../push-position-stack/index.scss';
import MyContext from '../../context';
import { initialState } from '../../constants';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const positions = 'UTG,UTG+1,MP,MP+1,HJ,CO,BU,SB,BB';
const positionsArray = positions.split(',');

// Separate component for position selectors
const PositionSelector = ({ position, active, onClick, disabled = false }) => (
	<button
		className={`selector ${active ? 'active' : ''}`}
		disabled={disabled}
		onClick={onClick}
	>
		{position}
	</button>
);

// Separate component for range fields
const RangeFields = ({ tableValues, onChange, onClick, errors, clearFunction, actionToAdd }) => (
	<div className="selector-body range-fields">
		<Field
			register={{ onChange, onClick }}
			type="text"
			name="raise"
			label="Raise Range"
			error={errors.raise}
			placeholder="Raise Range"
			value={tableValues?.raise}
			clear={true}
			clearFunction={() => clearFunction('raise')}
			actionToAdd={actionToAdd}
		/>
		<Field
			register={{ onChange, onClick }}
			type="text"
			name="call"
			label="Call Range"
			error={errors.call}
			placeholder="Call Range"
			value={tableValues?.call}
			clear={true}
			clearFunction={() => clearFunction('call')}
			actionToAdd={actionToAdd}
		/>
		<Field
			register={{ onChange, onClick }}
			type="text"
			name="bluff"
			label="Bluff Range"
			error={errors.bluff}
			placeholder="Bluff Range"
			value={tableValues?.bluff}
			clear={true}
			clearFunction={() => clearFunction('bluff')}
			actionToAdd={actionToAdd}
		/>
		<Field
			register={{ onChange, onClick }}
			type="text"
			name="fold"
			label="Fold Range"
			error={errors.fold}
			placeholder="Fold Range"
			value={tableValues?.fold}
			clear={true}
			clearFunction={() => clearFunction('fold')}
			actionToAdd={actionToAdd}
		/>
	</div>
);

// Separate component for menu buttons
const MenuButtons = ({ key, handleMenu }) => (
	<div className="button-container spaced">
		<Button className={key === 'OR' ? 'selected' : ''} onClick={() => handleMenu('OR')}>
			Open Raise
		</Button>
		<Button className={key === 'ROR' ? 'selected' : ''} onClick={() => handleMenu('ROR')}>
			Respuesta vs OR
		</Button>
		<Button className={key === 'RES3' ? 'selected' : ''} onClick={() => handleMenu('RES3')}>
			Respuesta 3Bet
		</Button>
		<Button className={key === 'ROL' ? 'selected' : ''} onClick={() => handleMenu('ROL')}>
			ROL
		</Button>
		<Button className={key === 'PUSH' ? 'selected' : ''} onClick={() => handleMenu('PUSH')}>
			Push por Pos. y Stack
		</Button>
	</div>
);

export const LoadRange = () => {
	const { tableValues, setTableValues } = useContext(MyContext);

	const [range, setRange] = useState(initialState);
	const [flatRanges, setFaltRanges] = useState([]);
	const [flatSelected, setFlatSelected] = useState(-1);
	const [avg, setAvg] = useState(null);
	const [sbAction, setSbAction] = useState('');
	const [key, setKey] = useState('');
	const [situation, setSituation] = useState('');
	const [actionToAdd, setActionToAdd] = useState('');
	const [yourPosition, setYourPosition] = useState('');
	const [villainPosition, setVillainPosition] = useState('');
	const [bbsSelected, setBbsSelected] = useState('');
	const [positionSelected, setPositionSelected] = useState('');
	const [effectiveStack, setEffectiveStack] = useState(100); // Default to 100BB
	const [errors] = useState({ call: '', raise: '', bluff: '', fold: '' });

	useEffect(() => {
		const res = calculateAvg(range);
		setAvg(res);
	}, [range]);

	useEffect(() => {
		const res = calculateAvg(tableValues);
		setAvg(res);
	}, [tableValues]);

	// Memoized handlers
	const onChange = useCallback(event => {
		const {
			target: { name, value }
		} = event;

		if (name.includes('span')) {
			const { notes } = tableValues;
			setTableValues({ ...tableValues, notes: { ...notes, [name]: value } });
		} else if (name.includes('messages')) {
			const { notes } = tableValues;
			const { messages } = notes;
			const [, index, isButton] = name.split('-');
			messages[index] = isButton ? '' : value;
			setTableValues({ ...tableValues, notes: { ...notes, messages: messages } });
		} else {
			setTableValues({ ...tableValues, [name]: value });
		}
	}, [tableValues, setTableValues]);

	const onClick = event => {
		const {
			target: { name }
		} = event;

		setActionToAdd(name);
	};

	const handleSave = useCallback(async () => {
		try {
			const res = await saveRange({
				key,
				situation,
				effectiveStack,
				...tableValues,
				notes: {
					...tableValues.notes,
					messages: tableValues.notes?.messages?.filter(m => m.trim() !== '')
				}
			});

			if (res.status === 200) {
				toast.success(res.data);
			}
		} catch (error) {
			if (error.code === 'ERR_BAD_REQUEST') {
				toast.error(error?.response?.data.message);
			} else {
				toast.error(error.message);
			}
		}
	}, [key, situation, effectiveStack, tableValues]);

	// Memoized position selectors
	const positionsOR = useMemo(() => {
		return positionsArray.slice(0, -1).map(p => (
			<PositionSelector
				key={p}
				position={p}
				active={p === situation}
				onClick={() => {
					setSituation(p);
					setTableValues(initialState);
					getData('OR', p, effectiveStack).then(rangeData => {
						setRange(rangeData);
						setTableValues(rangeData);
					});
				}}
			/>
		));
	}, [situation, setTableValues]);

	const getPositionsROR = useCallback((player = '') => {
		return positionsArray.map(p => {
			const active = player ? yourPosition === p : villainPosition === p;
			const disabled = player && positionsArray.indexOf(p) - 1 < positionsArray.indexOf(villainPosition);

			return (
				<PositionSelector
					key={p}
					position={p}
					active={active}
					disabled={disabled}
					onClick={() => {
						let indexYP = positionsArray.indexOf(yourPosition);
						let indexVP = positionsArray.indexOf(villainPosition);

						if (player === 'you') {
							setYourPosition(p);
							indexYP = positionsArray.indexOf(p);
							if (positionsArray.indexOf(p) - 1 < indexVP) {
								setVillainPosition('');
							}
						} else {
							setVillainPosition(p);
							indexVP = positionsArray.indexOf(p);
						}

						const realYourPos = getRealPositionLong(indexYP);
						const realVillainPos = getRealPositionLong(indexVP);
						setSituation(`${realYourPos}|${realVillainPos}`);
						setTableValues(initialState);

						if (realYourPos && realVillainPos) {
							getData('ROR', `${realYourPos}|${realVillainPos}`).then(rangeData => {
								setRange(rangeData);
								setTableValues(rangeData);
							});
						}
					}}
				/>
			);
		});
	}, [yourPosition, villainPosition, setTableValues]);

	const getPositionsRes3 = useCallback((player = '') => {
		return positionsArray.map(p => {
			const active = player ? yourPosition === p : villainPosition === p;
			const disabled = (!player && p.includes('UTG')) ||
							(player && p === 'BB') ||
							(!player && positionsArray.indexOf(yourPosition) > positionsArray.indexOf(p) - 1);

			return (
				<PositionSelector
					key={p}
					position={p}
					active={active}
					disabled={disabled}
					onClick={() => {
						let indexYP = positionsArray.indexOf(yourPosition);
						let indexVP = positionsArray.indexOf(villainPosition);

						if (player === 'you') {
							setYourPosition(p);
							indexYP = positionsArray.indexOf(p);
							if (positionsArray.indexOf(p) - 1 < indexVP) {
								setVillainPosition('');
							}
						} else {
							setVillainPosition(p);
							indexVP = positionsArray.indexOf(p);
						}

						const realYourPos = getRealPositionLong(indexYP);
						const realVillainPos = getRealPositionLong(indexVP);

						if (!(yourPosition === 'SB' && villainPosition === 'BB')) {
							setSbAction('');
						}

						setSituation(`${realYourPos}|${realVillainPos}`);
						setTableValues(initialState);

						if (realYourPos && realVillainPos) {
							getData('RES3', `${realYourPos}|${realVillainPos}`).then(rangeData => {
								setRange(rangeData);
								setTableValues(rangeData);
							});
						}
					}}
				/>
			);
		});
	}, [yourPosition, villainPosition, setTableValues]);

	const getPositionsROL = useCallback(() => {
		return positionsArray.map(p => (
			<PositionSelector
				key={p}
				position={p}
				active={yourPosition === p}
				onClick={() => {
					const indexYP = positionsArray.indexOf(p);
					const realYourPos = getRealPositionROL(indexYP);

					setYourPosition(p);
					setTableValues(initialState);

					getData('ROL', `${realYourPos}`).then(rangeData => {
						setRange(rangeData);
						setTableValues(rangeData);
					});

					setSituation(`${realYourPos}`);
				}}
			/>
		));
	}, [yourPosition, setTableValues]);

	const sbVsBbOptions = useCallback(() => {
		const indexYP = positionsArray.indexOf(yourPosition);
		const indexVP = positionsArray.indexOf(villainPosition);

		const realYourPos = getRealPositionLong(indexYP);
		const realVillainPos = getRealPositionLong(indexVP);

		const handleAction = (action) => {
			setSbAction(action);
			setSituation(`${realYourPos}|${realVillainPos}|${action}`);
		};

		return (
			<>
				<PositionSelector
					position="Respuesta a 3Bet"
					active={sbAction === '3Bet'}
					onClick={() => handleAction('3Bet')}
					notCircle
				/>
				<PositionSelector
					position="Respuesta a RoL"
					active={sbAction === 'ROL'}
					onClick={() => handleAction('ROL')}
					notCircle
				/>
			</>
		);
	}, [yourPosition, villainPosition, sbAction, setSituation]);

	const renderSelectorPush = () => {
		const handleSelection = event => {
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
		};
		return (
			<div style={{ width: '100%' }}>
				<div className="selector-push">
					<span>BBs</span>
					<div>
						{Array.from({ length: 19 }, (x, i) => i + 2)
							.reverse()
							.map(i => (
								<button
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
			</div>
		);
	};

	const loadRangePush = (rangeSelector, index) => {
		setTableValues(initialState);
		setFlatSelected(index);
		const sitAux = rangeSelector.replace('+', '').replace(/\s/, '');
		setSituation(sitAux);
		getData('PUSH', sitAux).then(rangeData => {
			setRange(rangeData);
			setTableValues(rangeData);
		});
	};

	useEffect(() => {
		if (bbsSelected && positionSelected) {
			let flag = false;
			const auxRanges = [];
			[...positionsArray, 'BB'].forEach(p => {
				if (flag) {
					auxRanges.push(`F-${p}|${positionSelected.trim().replace('+', '')}|${bbsSelected.trim()}BB`);
				}
				if (p === positionSelected.trim()) {
					flag = true;
				}
			});

			setFaltRanges(auxRanges);
			setFlatSelected(-1);
			setTableValues(initialState);

			const sitAux = `${positionSelected.replace('+', '')}|${bbsSelected}BB`;
			getData('PUSH', sitAux).then(rangeData => {
				setRange(rangeData);
				setTableValues(rangeData);
			});

			setSituation(sitAux);
		}
	}, [positionSelected, bbsSelected, setTableValues]);

	const handleMenu = useCallback(val => {
		setKey(val);
		setTableValues(initialState);
	}, [setTableValues]);

	const clearFunction = useCallback(val => {
		setTableValues(prev => ({ ...prev, [val]: '' }));
	}, [setTableValues]);

	const handleAddMessage = useCallback(() => {
		setTableValues(prev => ({
			...prev,
			notes: {
				...prev.notes,
				messages: [...(prev.notes?.messages || []), '']
			}
		}));
	}, [setTableValues]);

	// Effective stack selector component
	const EffectiveStackSelector = () => (
		<div className="selector-push">
			<span>Effective Stack (BB)</span>
			<div>
				{['100bb', '60bb', '40bb', '30bb', '20bb', '15bb', '10bb'].map(stack => (
					<button
						key={stack}
						className={`selector ${stack === effectiveStack ? 'active' : ''}`}
						onClick={() => setEffectiveStack(stack)}
					>
						{stack}
					</button>
				))}
			</div>
		</div>
	);

	return (
		<div className="selector-container">
			<MenuButtons key={key} handleMenu={handleMenu} />
			<EffectiveStackSelector />

			<div className="row content-container" style={{ justifyContent: 'center', paddingBottom: '15px' }}>
				{key === 'OR' && positionsOR}
				{key === 'ROR' && (
					<div className="selector-container">
						<div className="selector-body">
							<span className="selector label">OR</span>
							{getPositionsROR()}
						</div>
						<div className="selector-body">
							<span className="selector label">Hero</span>
							{getPositionsROR('you')}
						</div>
					</div>
				)}
				{key === 'RES3' && (
					<div className="selector-container">
						<div className="selector-body">
							<span className="selector label">OR</span> {getPositionsRes3('you')}
						</div>
						<div className="selector-body">
							<span className="selector label">3Bet</span> {getPositionsRes3()}
						</div>
						{yourPosition === 'SB' && villainPosition === 'BB' && (
							<div className="selector-body">{sbVsBbOptions()}</div>
						)}
					</div>
				)}
				{key === 'ROL' && getPositionsROL()}
				{key === 'PUSH' && renderSelectorPush()}
			</div>

			<RangeFields
				tableValues={tableValues}
				onChange={onChange}
				onClick={onClick}
				errors={errors}
				clearFunction={clearFunction}
				actionToAdd={actionToAdd}
			/>

			<Button onClick={handleSave}>Guardar</Button>

			<div className="flex-container">
				<div className="row content-container">
					<CardTable actionToAdd={actionToAdd} isEditable={true} />
					<notesContainer
						data={{ ...tableValues?.notes, avg }}
						isEditable={true}
						onChange={onChange}
						handleAddMessage={handleAddMessage}
					/>
					{flatRanges.length > 0 && (
						<div className="flat-container">
							<div className="flat-title">Flat</div>
							{flatRanges.map((rangeText, index) => {
								const text = rangeText.split('-')[1].split('|')[0];
								return (
									<div
										key={index}
										className={`flat-option ${flatSelected === index ? 'selected' : ''}`}
										onClick={() => loadRangePush(rangeText, index)}
									>
										{text}
									</div>
								);
							})}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default LoadRange;
