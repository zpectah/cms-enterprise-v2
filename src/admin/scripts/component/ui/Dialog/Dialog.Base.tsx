import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
	Dialog,
	Stack,
	DialogActions,
	DialogContent,
	DialogContentProps,
	DialogContentText,
	DialogTitle,
} from '@mui/material';
import { DialogProps } from '@mui/material/Dialog';

import {
	Button,
	CloseIconButton,
} from '../Button';
import getTestDataAttr from '../../../utils/getTestDataAttr';

export interface DialogBaseProps extends DialogProps {
	dataId?: string;
	onClose: () => void;
	id?: string;
	title?: string;
	textContent?: string;
	actions?: React.ReactNode;
	showFooterClose?: boolean;
	showHeaderClose?: boolean;
	showBodyClose?: boolean;
	footerAlign?: 'space-between' | 'center' | 'space-evenly';
	keepMounted?: boolean;
	dialogContentProps?: DialogContentProps;
}

const DialogBase: React.FC<DialogBaseProps> = (props) => {
	const {
		children,
		dataId = 'dialog-base',
		open = false,
		onClose,
		id = 'dialog-base',
		title,
		textContent,
		actions,
		showFooterClose,
		showHeaderClose,
		showBodyClose,
		footerAlign = 'space-between',
		scroll = 'paper',
		maxWidth = 'md',
		fullWidth = true,
		fullScreen,
		dialogContentProps,
		...rest
	} = props;

	const { t } = useTranslation([ 'common' ]);
	const [ isOpen, setIsOpen ] = useState<boolean>(open);

	const handleClose = () => {
		setIsOpen(false);
		if (onClose) onClose();
	};

	const renderCloseIconButton = () => {
		return (
			<CloseIconButton
				aria-label={t('btn.close')}
				onClick={onClose}
				dataId={`${id}_icon-close`}
				sx={{
					position: 'absolute',
					right: 8,
					top: 8,
					color: (theme) => theme.palette.grey[500],
				}}
			/>
		);
	};

	useEffect(() => setIsOpen(open), [open]);

	return (
		<Dialog
			open={isOpen}
			onClose={handleClose}
			aria-labelledby={`${id}_title`}
			aria-describedby={`${id}_description`}
			scroll={scroll}
			maxWidth={maxWidth}
			fullWidth={fullWidth}
			fullScreen={fullScreen}
			{...rest}
		>
			<div {...getTestDataAttr(dataId)}>
				{title && (
					<DialogTitle id={`${id}_title`}>
						{title}
						{showHeaderClose && renderCloseIconButton()}
					</DialogTitle>
				)}
				<DialogContent
					{...dialogContentProps}
				>
					{textContent ? (
						<DialogContentText id={`${id}_description`}>
							{textContent}
						</DialogContentText>
					) : (
						<>{children}</>
					)}
					{showBodyClose && renderCloseIconButton()}
				</DialogContent>
				<DialogActions>
					<Stack direction="row" spacing={2} alignItems={footerAlign}>
						{showFooterClose && <Button
							onClick={handleClose}
							dataId={`${id}_button-close`}
						>{t('btn.close')}</Button>}
						{actions}
					</Stack>
				</DialogActions>
			</div>
		</Dialog>
	);
};

export default DialogBase;