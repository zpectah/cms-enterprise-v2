import React from 'react';
import FormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel';

import Switch, { SwitchProps } from './Switch';

export interface SwitchControlledProps extends SwitchProps {
	label?: string;
	labelProps?: FormControlLabelProps;
}

const SwitchControlled = (props: SwitchControlledProps) => {
	const {
		label,
		labelProps,
		...rest
	} = props;

	return (
		<FormControlLabel
			label={label}
			control={<Switch {...rest} />}
			{...labelProps}
		/>
	);
};

export default SwitchControlled;
