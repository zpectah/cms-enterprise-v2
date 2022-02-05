import React from 'react';
import Checkbox, { CheckboxProps } from '@mui/material/Checkbox';

export interface CheckboxBaseProps extends CheckboxProps {}

const CheckboxBase = (props: CheckboxBaseProps) => {
	const {
		...rest
	} = props;

	return (
		<Checkbox
			{...rest}
		/>
	);
};

export default CheckboxBase;