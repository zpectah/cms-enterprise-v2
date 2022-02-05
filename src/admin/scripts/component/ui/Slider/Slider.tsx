import React from 'react';
import Box, { BoxProps } from '@mui/material/Box';
import Stack, { StackProps } from '@mui/material/Stack';

import SliderBase, { SliderBaseProps } from './Slider.Base';

export interface SliderProps extends SliderBaseProps {
	boxProps?: BoxProps;
	stackProps?: StackProps;
	iconBefore?: React.ReactNode;
	iconAfter?: React.ReactNode;
}

const Slider = (props: SliderProps) => {
	const {
		boxProps,
		stackProps = {
			spacing: 2,
			direction: 'row',
			alignItems: 'center',
		},
		iconBefore,
		iconAfter,
		...rest
	} = props;

	return (
		<Box
			{...boxProps}
		>
			<Stack
				{...stackProps}
			>
				{iconBefore && iconBefore}
				<SliderBase
					{...rest}
				/>
				{iconAfter && iconAfter}
			</Stack>
		</Box>
	);
};

export default Slider;
