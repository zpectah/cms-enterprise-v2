import React from 'react';

import Form, { FormProps } from './Form';

interface FormProviderProps extends FormProps {}

const FormProvider: React.FC<FormProviderProps> = (props) => {
	const {
		...rest
	} = props;

	return (
		<Form
			{...rest}
		/>
	);
};

export default FormProvider;