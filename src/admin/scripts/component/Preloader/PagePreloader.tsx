import React from 'react';
import { Backdrop, CircularProgress } from '@mui/material';

interface PagePreloaderProps {}

const PagePreloader = (props: PagePreloaderProps) => {
	const {} = props;

	return (
		<Backdrop
			sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
			open
		>
			<CircularProgress color="inherit" />
		</Backdrop>
	);
};

export default PagePreloader;