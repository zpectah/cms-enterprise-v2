import React from 'react';
import { Stack } from '@mui/material';

interface FormRowBaseProps {
	required?: boolean;
	label?: string;
	direction?: 'column' | 'row';
	spacing?: number;
	id?: string;
	helpTexts?: string[];
	errors?: string[];
}

const FormRowBase: React.FC<FormRowBaseProps> = (props) => {
	const {
		children,
		required,
		label,
		direction = 'column',
		spacing = 2,
		id,
		helpTexts = [],
		errors = [],
	} = props;

	return (
		<Stack
			direction={direction}
			spacing={spacing}
		>
			<label htmlFor={id}>{label}{required && ' *'}</label>
			<div>
				<div>
					{children}
				</div>
				<div>
					{helpTexts.map((text, index) => (
						<div key={index}>{text}</div>
					))}
				</div>
				<div>
					{errors.map((text, index) => (
						<div key={index}>{text}</div>
					))}
				</div>
			</div>
		</Stack>
	);
};

export default FormRowBase;