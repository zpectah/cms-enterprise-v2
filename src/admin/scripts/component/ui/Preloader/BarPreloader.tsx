import React from 'react';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';

export interface BarPreloaderProps extends LinearProgressProps {}

const BarPreloader = (props: BarPreloaderProps) => {
	const {
		sx = {
			width: '100%',
			position: 'fixed',
			top: 0,
			left: 0,
			zIndex: 1050,
		},
		color = 'primary',
		...rest
	} = props;

	return (
		<LinearProgress
			sx={sx}
			color={color}
			{...rest}
		/>
	);
};

export default BarPreloader;