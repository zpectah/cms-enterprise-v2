import React from 'react';

import ToggleBase, { ToggleBaseProps } from './Toggle.Base';

export interface ToggleProps extends ToggleBaseProps {}

const Toggle = (props: ToggleProps) => {
	const {
		...rest
	} = props;

	return (
		<ToggleBase
			{...rest}
		/>
	);
};

export default Toggle;
