import React from 'react';
import { Controller, ControllerProps } from 'react-hook-form';

import FormRow, { FormRowProps } from './FormRow';

interface ControlledFormRowProps extends ControllerProps {
	rowProps?: FormRowProps;
	control: any;
}

const ControlledFormRow = (props: ControlledFormRowProps) => {
	const {
		render,
		control,
		rowProps,
		...rest
	} = props;

	return (
		<Controller
			control={control}
			render={({ field, fieldState, formState  }) => {
				const { error, isTouched } = fieldState;
				const errors = [];
				if (isTouched && error) errors.push(error.type);

				return (
					<FormRow
						errors={errors}
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
