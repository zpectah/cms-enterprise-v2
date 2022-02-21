import React, { useState } from 'react';
import { default as MuiSnackbar, SnackbarProps as MuiSnackbarProps } from '@mui/material/Snackbar';

import { CloseIconButton } from '../Button';

export interface SnackbarProps extends MuiSnackbarProps {}

const Snackbar: React.FC<SnackbarProps> = (props) => {
	const {
		open,
		autoHideDuration = 5000,
		...rest
	} = props;

	const [ display, setDisplay ] = useState(open);

	const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
		if (reason === 'clickaway') {
			return;
		}

		setDisplay(false);
	};

	const action = (
		<CloseIconButton
			onClick={handleClose}
		/>
	);

	return (
		<MuiSnackbar
			open={display}
			action={action}
			autoHideDuration={autoHideDuration}
			onClose={handleClose}
			{...rest}
		/>
	);
};

export default Snackbar;
