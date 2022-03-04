import React from 'react';
import { Controller, ControllerProps } from 'react-hook-form';

import FormRow, { FormRowProps } from './FormRow';

export interface ControlledFormRowProps extends ControllerProps {
	rowProps?: FormRowProps;
	// control: any;
}

const ControlledFormRow = (props: ControlledFormRowProps) => {
	const {
		rules,
		render,
		control,
		rowProps,
		...rest
	} = props;

	return (
		<Controller
			rules={rules}
			control={control}
			render={({ field, fieldState, formState  }) => {
				const { error, isTouched } = fieldState;
				const errors = [];
				if (isTouched && error) errors.push(error.type);

				return (
					<FormRow
						errors={errors}
						required={!!rules.required}
						{...rowProps}
					>
						{render({ field, fieldState, formState })}
					</FormRow>
				);
			}}
			{...rest}
		/>
	);
};

export default ControlledFormRow;
