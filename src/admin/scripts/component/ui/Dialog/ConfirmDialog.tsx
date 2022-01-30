import React, { useEffect, useState } from 'react';
import { Stack } from '@mui/material';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

import DialogBase, { DialogBaseProps } from './Dialog.Base';

interface ConfirmDialogProps extends DialogBaseProps {
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
		isOpen,
		onClose,
		...rest
	} = props;
	const [open, setOpen] = useState<boolean>(isOpen);

	const handleClose = () => {
		setOpen(false);
		onClose();
	};
	const handleConfirm = () => {
		onConfirm();
		handleClose();
	};

	useEffect(() => setOpen(isOpen), [isOpen]);

	return (
		<DialogBase
			TransitionComponent={Transition}
			onClose={onClose}
			isOpen={open}
			maxWidth="sm"
			showBodyClose
			id={`confirm-dialog_${context}`}
			{...rest}
		>
			<Stack direction="column" spacing={3}>
				<Stack direction="row" spacing={3} alignItems="center">
					custom title in body
				</Stack>
				<Stack direction="row" spacing={3} alignItems="center">
					bla bla bla ... {context} ... {JSON.stringify(confirmData)}
				</Stack>
				<Stack direction="row" spacing={3} alignItems="center">
					<button onClick={handleConfirm}>Confirm</button>
					<button onClick={handleClose}>Cancel</button>
				</Stack>
			</Stack>
		</DialogBase>
	);
};

export default ConfirmDialog;