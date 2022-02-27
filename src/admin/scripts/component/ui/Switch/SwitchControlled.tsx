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
		sx = {
			marginRight: 1.5,
		},
		...rest
	} = props;

	return (
		<FormControlLabel
			label={label}
			control={
				<Switch
					sx={sx}
					{...rest}
				/>
			}
			{...labelProps}
		/>
	);
};

export default SwitchControlled;
