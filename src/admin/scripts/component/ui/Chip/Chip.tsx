import React from 'react';

import ChipBase, { ChipBaseProps } from './Chip.Base';

export interface ChipProps extends ChipBaseProps {}

const Chip = (props: ChipProps) => {
	const {
		...rest
	} = props;

	return (
		<ChipBase
			{...rest}
		/>
	);
};

export default Chip;
