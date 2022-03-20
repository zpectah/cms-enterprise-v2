import React from 'react';
import Slider, { SliderProps } from '@mui/material/Slider';

import { getTestDataAttr } from '../../../utils';

export interface SliderBaseProps extends SliderProps {
	dataId?: string;
}

const SliderBase = (props: SliderBaseProps) => {
	const {
		dataId = 'slider',
		...rest
	} = props;

	return (
		<Slider
			{...rest}
			{...getTestDataAttr(dataId)}
		/>
	);
};

export default SliderBase;
