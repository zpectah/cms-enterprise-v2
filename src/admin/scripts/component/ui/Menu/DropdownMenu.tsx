import React, { useState } from 'react';
import { Box, BoxProps, Menu, MenuItem } from '@mui/material';

export interface MoreMenuItemProps {
	key: string | number;
	label: string;
	onClick: () => void;
	disabled?: boolean;
	hidden?: boolean;
	selected?: boolean;
}
export interface DropdownMenuProps {
	renderButton: (renderProps: any, open: boolean) => React.ReactNode;
	options: MoreMenuItemProps[];
	id: string;
	maxHeight?: number;
	width?: string;
	boxProps?: BoxProps;
}

const DropdownMenu = (props: DropdownMenuProps) => {
	const {
		renderButton,
		options = [],
		id,
		maxHeight = 250,
		width = '10rem',
		boxProps = {
			component: 'div',
		},
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
			{renderButton({
				'aria-controls': open ? id : undefined,
				'aria-expanded': open ? 'true' : undefined,
				'aria-haspopup': 'true',
				onClick: openHandler,
			}, open)}
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
							selected={option.selected}
						>
							{option.label}
						</MenuItem>
					);
				})}
			</Menu>
		</Box>
	);
};

export default DropdownMenu;
