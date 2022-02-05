import React, { useEffect, useState } from 'react';
import { Stack, Typography } from '@mui/material';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

import Dialog, { DialogProps } from './Dialog';
import { PrimaryButton, SecondaryButton } from '../Button';

interface ConfirmDialogProps extends DialogProps {
	context?: 'default' | 'delete';
	confirmData: (string | number)[];
	onConfirm: () => void;
}

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement<any, any>;
	},
	ref: React.Ref<unknown>,
) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const ConfirmDialog = (props: ConfirmDialogProps) => {
	const {
		context = 'default',
		confirmData,
		onConfirm,
		open = false,
		onClose,
		...rest
	} = props;
	const [ isOpen, setIsOpen ] = useState<boolean>(open);

	const handleClose = () => {
		setIsOpen(false);
		onClose();
	};
	const handleConfirm = () => {
		onConfirm();
		handleClose();
	};

	useEffect(() => setIsOpen(open), [open]);

	return (
		<Dialog
			TransitionComponent={Transition}
			onClose={onClose}
			open={isOpen}
			maxWidth="xs"
			showBodyClose
			id={`confirm-dialog_${context}`}
			{...rest}
		>
			<Stack direction="column" spacing={3}>
				<Stack
					direction="row"
					spacing={4}
					alignItems="center"
					justifyContent="center"
				>
					<Typography variant="h4">
						custom title in body
					</Typography>
				</Stack>
				<Stack
					direction="row"
					spacing={4}
					alignItems="center"
					justifyContent="center"
				>
					bla bla bla ... {context} ... {JSON.stringify(confirmData)}
				</Stack>
				<Stack
					direction="row"
					spacing={4}
					alignItems="center"
					justifyContent="center"
				>
					<PrimaryButton onClick={handleConfirm}>Confirm</PrimaryButton>
					<SecondaryButton onClick={handleClose}>Cancel</SecondaryButton>
				</Stack>
			</Stack>
		</Dialog>
	);
};

export default ConfirmDialog;