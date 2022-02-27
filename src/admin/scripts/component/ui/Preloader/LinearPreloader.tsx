import React from 'react';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Box, { BoxProps } from '@mui/material/Box';

export interface LinearPreloaderProps extends LinearProgressProps {
	boxProps?: BoxProps;
}

const LinearPreloader = (props: LinearPreloaderProps) => {
	const {
		boxProps,
		color = 'primary',
		...rest
	} = props;

	return (
		<Box
			sx={{
				width: '100%',
				p: 1.5,

			}}
			{...boxProps}
		>
			<LinearProgress
				color={color}
				{...rest}
			/>
		</Box>
	);
};

export default LinearPreloader;