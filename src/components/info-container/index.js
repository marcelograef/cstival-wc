import React, { useState } from 'react';
import Field from '../field/index';
import './index.scss';
import Button from '../button';

const InfoContainer = ({ data, isEditable, onChange, handleAddMessage }) => {
	console.log({ data });
	const { messages, ...infoInput } = data;
	const [info] = useState(data);

	if (info) {
		const { span01, span02 } = data;

		return (
			<div className="table-info">
				<div className="info">
					{span01 && !isEditable && <div className="span01">{span01}</div>}
					{span02 && !isEditable && <div className="span02">{span02}</div>}
					{isEditable && (
						<>
							<Field
								register={{ onChange: onChange }}
								type="text"
								name="span01"
								placeholder="Info"
								error={info.span01}
								label=""
								options=""
								value={span01}
							></Field>
							<Field
								register={{ onChange: onChange }}
								type="text"
								name="span02"
								placeholder="Info"
								error={info.span02}
								label=""
								options=""
								value={span02}
							></Field>
						</>
					)}
				</div>
				<div className="avg-container">
					{info?.avg &&
						info?.avg?.map((k, i) => (
							<div key={i} className="avg" data-action={k.action}>
								{k.action}: {k.avg}
							</div>
						))}
				</div>
				<div className="text-container">
					{isEditable && <Button onClick={handleAddMessage}>Add message</Button>}
					{messages?.map((k, i) => {
						if (isEditable) {
							return (
								<Field
									register={{ onChange: onChange }}
									type="textarea"
									key={i}
									name={`messages-${i}`}
									placeholder="Info"
									label=""
									options=""
									value={k}
									clearFunction={onChange}
								></Field>
							);
						} else {
							return <div key={i}>{k}</div>;
						}
					})}
				</div>
			</div>
		);
	}
	return null;
};

export default InfoContainer;
