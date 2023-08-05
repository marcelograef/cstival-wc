import React from 'react';

const Field = ({ type, name, label, error, options, register, placeholder, value }) => (
	<div className={`c-form__field c-form__field--${type}${error ? ' c-form__field--error' : ''}`}>
		<header className="c-form__field-head">
			<label htmlFor={name}>{label}</label>
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
			<textarea id={name} {...register(name)} placeholder={placeholder} cols={30} rows={10}></textarea>
		) : (
			<input name={name} id={name} {...register} type={type} placeholder={placeholder} value={value} />
		)}
	</div>
);

export default Field;
