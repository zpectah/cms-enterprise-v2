import React from 'react';
import { useForm, UseFormReturn, UseFormProps } from 'react-hook-form';

import FormBase, { FormBaseProps } from './Form.Base';

export interface ControlledFormProps extends UseFormProps {
	formProps?: FormBaseProps;
	render: (form: UseFormReturn) => React.ReactNode;
}

const ControlledForm = (props: ControlledFormProps) => {
	const {
		formProps,
		render,
		mode = 'all',
		...rest
	} = props;

	const form = useForm({
		mode,
		...rest,
	});

	return (
		<FormBase
			{...formProps}
		>
			{render(form)}
		</FormBase>
	);
};

export default ControlledForm;
