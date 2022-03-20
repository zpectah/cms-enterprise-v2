import React from 'react';
import Chip, { ChipProps } from '@mui/material/Chip';

import { getTestDataAttr } from '../../../utils';

export interface ChipBaseProps extends ChipProps {
	dataId?: string;
}

const ChipBase = (props: ChipBaseProps) => {
	const {
		dataId = 'chip-base',
		...rest
	} = props;

	return (
		<Chip
			{...rest}
			{...getTestDataAttr(dataId)}
		/>
	);
};

export default ChipBase;