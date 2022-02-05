import React from 'react';
import Radio, { RadioProps } from '@mui/material/Radio';

export interface RadioBaseProps extends RadioProps {}

const RadioBase = (props: RadioBaseProps) => {
	const {
		...rest
	} = props;

	return (
		<Radio
			{...rest}
		/>
	);
};

export default RadioBase;