import React from 'react';
import {
	Box,
	BoxProps,
	CircularProgress,
	CircularProgressProps
} from '@mui/material';

interface BlockPreloaderProps extends BoxProps {
	circularProgressProps?: CircularProgressProps;
}

const BlockPreloader = (props: BlockPreloaderProps) => {
	const {
		sx = { display: 'flex' },
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