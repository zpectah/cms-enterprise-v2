import React, { useState, useEffect } from 'react';
import {
	Dialog,
	Stack,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { DialogProps } from '@mui/material/Dialog';

import Button from '../Button';
import getTestDataAttr from '../../../utils/getTestDataAttr';

export interface DialogBaseProps {
	dataId?: string;
	isOpen: boolean;
	onClose: () => void;
	id?: string;
	title?: string;
	textContent?: string;
	actions?: React.ReactNode;
	showFooterClose?: boolean;
	showHeaderClose?: boolean;
	showBodyClose?: boolean;
	footerAlign?: 'space-between' | 'center' | 'space-evenly';
	scroll?: DialogProps['scroll'];
	maxWidth?: DialogProps['maxWidth'];
	fullWidth?: boolean;
	fullScreen?: boolean;
	TransitionComponent?: DialogProps['TransitionComponent'];
	keepMounted?: boolean;
}

const DialogBase: React.FC<DialogBaseProps> = (props) => {
	const {
		children,
		dataId = 'dialog-base',
		isOpen,
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
		...rest
	} = props;
	const [open, setOpen] = useState<boolean>(isOpen);

	const handleClose = () => {
		setOpen(false);
		if (onClose) onClose();
	};

	const renderCloseIconButton = () => {
		return (
			<Button.Icon
				aria-label="close"
				onClick={onClose}
				dataId={`${id}_icon-close`}
				sx={{
					position: 'absolute',
					right: 8,
					top: 8,
					color: (theme) => theme.palette.grey[500],
				}}
			>
				<CloseIcon />
			</Button.Icon>
		);
	};

	useEffect(() => setOpen(isOpen), [isOpen]);

	return (
		<Dialog
			open={open}
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
				<DialogContent>
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
						{showFooterClose && <Button.Primary
							onClick={handleClose}
							dataId={`${id}_button-close`}
						>Close</Button.Primary>}
						{actions}
					</Stack>
				</DialogActions>
			</div>
		</Dialog>
	);
};

export default DialogBase;