import React, { useState } from 'react';
import { Box, BoxProps, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import IconButton, { IconButtonProps } from '../Button/IconButton';

export interface MoreMenuItemProps {
	key: string | number;
	label: string;
	onClick: () => void;
	disabled?: boolean;
	hidden?: boolean;
}
export interface MoreMenuProps {
	options: MoreMenuItemProps[];
	id: string;
	maxHeight?: number;
	width?: string;
	iconButtonProps?: IconButtonProps;
	boxProps?: BoxProps;
	disabled?: boolean;
}

const MoreMenu = (props: MoreMenuProps) => {
	const {
		options = [],
		id,
		maxHeight = 250,
		width = '10rem',
		iconButtonProps = {
			id: `${id}_button`,
			size: 'small',
		},
		boxProps = {
			component: 'div',
		},
		disabled,
	} = props;

	const [ anchorEl, setAnchorEl ] = useState<null | HTMLElement>(null);

	const open = Boolean(anchorEl);

	const openHandler = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const closeHandler = () => {
		setAnchorEl(null);
	};
	const onClickCallback = (callback: () => void) => {
		setAnchorEl(null);
		callback();
	};

	return (
		<Box
			{...boxProps}
		>
			<IconButton
				aria-label="more"
				aria-controls={open ? id : undefined}
				aria-expanded={open ? 'true' : undefined}
				aria-haspopup="true"
				onClick={openHandler}
				disabled={disabled}
				{...iconButtonProps}
			>
				<MoreVertIcon fontSize="small" />
			</IconButton>
			<Menu
				id={id}
				MenuListProps={{
					'aria-labelledby': `${id}_button`,
				}}
				anchorEl={anchorEl}
				open={open}
				onClose={closeHandler}
				PaperProps={{
					style: {
						maxHeight,
						width,
					},
				}}
			>
				{options.map((option) => {
					if (!option.hidden) return (
						<MenuItem
							key={option.key}
							onClick={() => onClickCallback(option.onClick)}
							disabled={option.disabled}
						>
							{option.label}
						</MenuItem>
					);
				})}
			</Menu>
		</Box>
	);
};

export default MoreMenu;
