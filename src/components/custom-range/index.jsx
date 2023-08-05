import React, { useContext } from 'react';
import { useEffect, useState } from 'react';
import { saveRange } from '../../utilities';
import { calculateAvg } from '../../utilities/calculateInfo.js';
import { Button, CardTable, Field, InfoContainer } from '../index';
import './index.scss';
import MyContext from '../../context';

export const CustomRange = () => {
	const { tableValues, setTableValues } = useContext(MyContext);

	const [avg, setAvg] = useState(null);
	const [range] = useState({});

	const [key, setKey] = useState('');
	const [situation, setSituation] = useState('');
	const [actionToAdd, setActionToAdd] = useState('');

	const [errors] = useState({ call: '', raise: '', bluff: '', fold: '' });

	useEffect(() => {
		const res = calculateAvg(tableValues);
		setAvg(res);
	}, [tableValues]);

	const onChange = (event) => {
		console.log("EStoy en onChange")
		const {
			target: { name, value }
		} = event;

		console.log({ name, value });

		if (name.includes('span')) {
			const { info } = tableValues;
			setTableValues({ ...tableValues, info: { ...info, [name]: value } });
		} else {
			setTableValues({ ...tableValues, [name]: value });
		}

		console.log({ tableValues });
	};

	const onClick = (event) => {
		console.log('EStoy en onClick');
		const {
			target: { name }
		} = event;
		console.log({ name });
		setActionToAdd(name);
	};

	const handleSave = () => {
		console.log({ range, key });
		console.log({ tableValues });
		try {
			saveRange({ key, situation, ...tableValues });
		} catch (error) {
			console.log({ error });
		}
	};

	return (
		<div className="selector-container">
			<div className="button-container spaced">
				<Button onClick={() => setKey('OR')}>Open Raise</Button>
				<Button onClick={() => setKey('ROR')}>Respuesta vs OR</Button>
				<Button onClick={() => setKey('RES3')}>Respuesta 3Bet</Button>
				<Button onClick={() => setKey('ROL')}>ROL</Button>
				<Button onClick={() => setKey('PUSH')}>Push por Pos. y Stack</Button>
			</div>
			<div className="selector-body">
				<Field
					register={{ onChange: onChange, onClick: onClick }}
					type="text"
					name="raise"
					label="Raise Range"
					error={errors.raise}
					placeholder="Raise Range"
					value={tableValues['raise']}
				/>
				<Field
					register={{ onChange: onChange, onClick: onClick }}
					type="text"
					name="call"
					label="Call Range"
					error={errors.call}
					placeholder="Call Range"
					value={tableValues['call']}
				/>
				<Field
					register={{ onChange: onChange, onClick: onClick }}
					type="text"
					name="bluff"
					label="Bluff Range"
					error={errors.bluff}
					placeholder="Bluff Range"
					value={tableValues['bluff']}
				/>
				<Field
					register={{ onChange: onChange, onClick: onClick }}
					type="text"
					name="fold"
					label="Fold Range"
					error={errors.fold}
					placeholder="Fold Range"
					value={tableValues['fold']}
				/>
			</div>
			<div className="flex-container">
				<div className="row content-container" style={{ justifyContent: 'space-around' }}>
					<Field
						register={{onChange: e => console.log(e)}}
						type="text"
						name="raise"
						error={errors.raise}
						placeholder="Accion"
						value={key}
						disabled={true}
					/>
					<Field
						register={{ onChange: e => setSituation(e.target.value) }}
						type="text"
						name="situacion"
						error={errors.raise}
						placeholder="Situacion"
						value={situation}
					/>
					<Button onClick={handleSave}>Guardar</Button>
				</div>
				<div className="row content-container">
					<CardTable actionToAdd={actionToAdd} isEditable={true} />
					<InfoContainer data={{ ...tableValues?.info, avg }} isEditable={true} onChange={onChange} />
				</div>
			</div>
		</div>
	);
};

export default CustomRange;
