import React from 'react';
import CircularProgress, { CircularProgressProps } from '@mui/material/CircularProgress';
import Box, { BoxProps } from '@mui/material/Box';

interface BlockPreloaderProps {
	sx?: BoxProps['sx'];
	color?: CircularProgressProps['color'];
}

const BlockPreloader = (props: BlockPreloaderProps) => {
	const { sx = { display: 'flex' }, color = 'primary' } = props;

	return (
		<>
			<Box sx={sx}>
				<CircularProgress color={color} />
			</Box>
		</>
	);
};

export default BlockPreloader;