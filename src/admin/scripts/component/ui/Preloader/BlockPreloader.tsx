import React from 'react';
import {
	Box,
	BoxProps,
	CircularProgress,
	CircularProgressProps
} from '@mui/material';

export interface BlockPreloaderProps extends BoxProps {
	circularProgressProps?: CircularProgressProps;
}

const BlockPreloader = (props: BlockPreloaderProps) => {
	const {
		sx = {
			width: '100%',
			minHeight: '5rem',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
		},
		circularProgressProps = {
			color: 'primary',
		},
		...rest
	} = props;

	return (
		<Box
			sx={sx}
			{...rest}
		>
			<CircularProgress {...circularProgressProps} />
		</Box>
	);
};

export default BlockPreloader;