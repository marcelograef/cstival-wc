import React from 'react';
import './index.scss';

const Field = ({
	type,
	name,
	label,
	error,
	options,
	register,
	placeholder,
	value,
	clear,
	clearFunction,
	actionToAdd
}) => (
	<div className={`c-form__field c-form__field--${type}${error ? ' c-form__field--error' : ''}`}>
		<header className="c-form__field-head">
			<div className={`label-container ${actionToAdd === name ? 'selected-' + actionToAdd : ''}`}>
				<label htmlFor={name}>{label}</label>
				{clear && <p onClick={clearFunction}>X</p>}
			</div>
			{error && <p className="c-form__error">{error.message}</p>}
		</header>

		{type === 'select' ? (
			<select id={name} {...register(name)}>
				{!!options &&
					options.map((option, key) => (
						<option value={option} key={key}>
							{option}
						</option>
					))}
			</select>
		) : type === 'textarea' ? (
			<div>
				<textarea
					name={name}
					id={name}
					{...register}
					placeholder={placeholder}
					cols={30}
					rows={10}
					value={value}
				></textarea>
				<button name={`${name}-1`} onClick={clearFunction}>
					X
				</button>
			</div>
		) : (
			<input name={name} id={name} {...register} type={type} placeholder={placeholder} value={value} />
		)}
	</div>
);

export default Field;
