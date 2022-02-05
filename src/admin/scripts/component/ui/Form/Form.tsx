import React from 'react';

import FormBase, { FormBaseProps } from './Form.Base';

export interface FormProps extends FormBaseProps {}

const Form: React.FC<FormProps> = (props) => {
	const {
		...rest
	} = props;

	return (
		<FormBase
			{...rest}
		/>
	);
};

export default Form;
