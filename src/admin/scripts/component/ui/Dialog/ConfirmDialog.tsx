import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Stack, Typography, Chip } from '@mui/material';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

import Dialog, { DialogProps } from './Dialog';
import { PrimaryButton, SecondaryButton } from '../Button';

export interface ConfirmDialogProps extends Partial<DialogProps> {
	context?: 'default' | 'delete' | 'logout' | 'report_comment';
	confirmData?: (string | number)[];
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

	const { t } = useTranslation([ 'common', 'components' ]);
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
					<Typography variant="h3">
						{t(`components:ConfirmDialog.title.${context}`)}
					</Typography>
				</Stack>
				<Stack
					direction="column"
					spacing={4}
					alignItems="center"
					justifyContent="center"
				>
					{t(`components:ConfirmDialog.content.${context}`)}
					{confirmData && (
						<Stack
							direction="row"
							alignItems="center"
							justifyContent="center"
							sx={{
								p: 2
							}}
						>
							{confirmData.map((item) => (
								<Chip
									key={item}
									label={`#${item}`}
								/>
							))}
						</Stack>
					)}
				</Stack>
				<Stack
					direction="row"
					spacing={4}
					alignItems="center"
					justifyContent="center"
				>
					<SecondaryButton
						onClick={handleClose}
						size="large"
					>
						{t('btn.cancel')}
					</SecondaryButton>
					<PrimaryButton
						onClick={handleConfirm}
						size="large"
					>
						{t('btn.confirm')}
					</PrimaryButton>
				</Stack>
			</Stack>
		</Dialog>
	);
};

export default ConfirmDialog;