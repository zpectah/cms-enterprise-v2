import React from 'react';
import {
	Backdrop,
	BackdropProps,
	CircularProgress,
	CircularProgressProps
} from '@mui/material';

export interface PagePreloaderProps extends Partial<BackdropProps> {
	circularProgressProps?: CircularProgressProps;
}

const PagePreloader = (props: PagePreloaderProps) => {
	const {
		circularProgressProps = {
			color: 'inherit',
		},
		sx = {
			color: '#fff',
			zIndex: (theme) => theme.zIndex.drawer + 1
		},
		...rest
	} = props;

	return (
		<Backdrop
			sx={sx}
			open
			{...rest}
		>
			<CircularProgress {...circularProgressProps} />
		</Backdrop>
	);
};

export default PagePreloader;