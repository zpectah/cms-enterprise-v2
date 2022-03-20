import React, { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Box, { BoxProps } from '@mui/material/Box';
import Drawer, { DrawerProps } from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import styled from '@emotion/styled';

import { CloseIconButton } from '../Button';
import { Scrollable } from '../Scrollable';
import { getTestDataAttr } from '../../../utils';

const DrawerContainer = styled(Box)`
	height: 100%;
	padding: 1rem;
	display: flex;
	flex-direction: column;
`;
const DrawerHeading = styled.div`
	padding-bottom: .5rem;
`;
const DrawerContent = styled.div`
	height: 100%;
	padding-top: .25rem;	
	position: relative;
	flex-grow: 1;
`;

export interface DrawerBaseProps extends DrawerProps {
	dataId?: string;
	onClose: () => void;
	boxProps?: BoxProps;
	showBodyClose?: boolean;
	title?: string;
	headingChildren?: React.ReactNode;
}

const DrawerBase: React.FC<DrawerBaseProps> = (props) => {
	const {
		children,
		dataId = 'drawer-base',
		id = 'dialog-base',
		open = false,
		onClose,
		boxProps,
		showBodyClose = true,
		title,
		headingChildren,
		...rest
	} = props;

	const [ isOpen, setIsOpen ] = useState<boolean>(open);

	const handleClose = () => {
		setIsOpen(false);
		if (onClose) onClose();
	};

	const renderCloseIconButton = () => {
		return (
			<CloseIconButton
				aria-label="close"
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
		<Drawer
			open={isOpen}
			onClose={handleClose}
			{...rest}
			{...getTestDataAttr(dataId)}
		>
			<DrawerContainer {...boxProps}>
				{(title || headingChildren) && (
					<DrawerHeading>
						<Typography
							variant="h5"
							component="span"
						>
							{title}
						</Typography>
						{headingChildren && headingChildren}
					</DrawerHeading>
				)}
				<DrawerContent>
					<Scrollable>
						{children}
					</Scrollable>
				</DrawerContent>
				{showBodyClose && renderCloseIconButton()}
			</DrawerContainer>
		</Drawer>
	);
};

export default DrawerBase;
