import React from 'react';
import Switch, { SwitchProps } from '@mui/material/Switch';

export interface SwitchBaseProps extends SwitchProps {}

const SwitchBase = (props: SwitchBaseProps) => {
	const {
		...rest
	} = props;

	return (
		<Switch
			size="small"
			{...rest}
		/>
	);
};

export default SwitchBase;
