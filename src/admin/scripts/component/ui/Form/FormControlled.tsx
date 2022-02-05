import React from 'react';

import { FormConsumer, FormProviderProps } from './Form.Base';
import Form, { FormProps } from './Form';

interface DefaultFormControlledProps {
	children: (form: FormProviderProps) => React.ReactNode;
}
export type FormControlledProps = DefaultFormControlledProps & FormProps;

const FormControlled: React.FC<FormControlledProps> = (props) => {
	const {
		children,
		...rest
	} = props;

	return (
		<Form
			children={<FormConsumer children={children} />}
			{...rest}
		/>
	);
};

export default FormControlled;
