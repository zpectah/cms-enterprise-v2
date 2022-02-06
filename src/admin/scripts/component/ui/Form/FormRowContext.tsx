import React from 'react';

import FormRow, { FormRowProps } from './FormRow';

interface FormRowContextProps extends FormRowProps {}

const FormRowContext: React.FC<FormRowContextProps> = (props) => {
	const {
		...rest
	} = props;

	return (
		<FormRow
			{...rest}
		/>
	);
};

export default FormRowContext;
