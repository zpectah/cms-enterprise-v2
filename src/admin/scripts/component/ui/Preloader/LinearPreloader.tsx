import React from 'react';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';

export interface LinearPreloaderProps extends LinearProgressProps {}

const LinearPreloader = (props: LinearPreloaderProps) => {
	const {
		...rest
	} = props;

	return (
		<LinearProgress
			{...rest}
		/>
	);
};

export default LinearPreloader;