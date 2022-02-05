import React from 'react';

import RadioBase, { RadioBaseProps } from './Radio.Base';

export interface RadioProps {}

const Radio = (props: RadioProps & RadioBaseProps) => {
	const {
		...rest
	} = props;

	return (
		<RadioBase
			{...rest}
		/>
	);
};

export default Radio;