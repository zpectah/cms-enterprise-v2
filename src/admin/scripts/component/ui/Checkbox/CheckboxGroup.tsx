import React from 'react';
import FormGroup, { FormGroupProps } from '@mui/material/FormGroup';
import FormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel';

import Checkbox, { CheckboxProps } from './Checkbox';

export interface CheckboxItemProps extends CheckboxProps {
	key: string | number;
	label: string;
}
export interface CheckboxGroupProps extends FormGroupProps {
	items: CheckboxItemProps[];
	formControlLabelProps?: FormControlLabelProps;
}

const CheckboxGroup = (props: CheckboxGroupProps) => {
	const {
		items = [],
		formControlLabelProps,
		...rest
	} = props;

	return (
		<FormGroup
			{...rest}
		>
			{items.map((item) => {
				const {
					key,
					label,
					...rest
				} = item;

				return (
					<FormControlLabel
						key={key}
						label={label}
						control={
							<Checkbox {...rest} />
						}
						{...formControlLabelProps}
					/>
				);
			})}
		</FormGroup>
	);
};

export default CheckboxGroup;