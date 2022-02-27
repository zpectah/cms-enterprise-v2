import React from 'react';

import SwitchBase, { SwitchBaseProps } from './Switch.Base';

export interface SwitchProps extends SwitchBaseProps {}

const Switch = (props: SwitchProps) => {
	const {
		...rest
	} = props;

	return (
		<SwitchBase
			value={true}
			{...rest}
		/>
	);
};

export default Switch;