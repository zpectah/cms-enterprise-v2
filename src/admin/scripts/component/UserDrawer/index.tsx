import React, { useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import {
	IconButton,
	Drawer,
} from '../ui';
import { DrawerProps } from '../ui/Drawer/Drawer';
import ThemeToggle from '../ThemeToggle';
import LanguageToggle from '../LanguageToggle';

interface UserDrawerProps {}

const UserDrawer = (props: UserDrawerProps) => {
	const {} = props;
	const [ drawerOpen, setDrawerOpen ] = useState<boolean>(false);

	const drawerProps: DrawerProps = {
		title: 'User profile',
		open: drawerOpen,
		onClose: () => setDrawerOpen(false),
		anchor: 'right',
		boxProps: {
			width: '300px',
		},
	};

	const toggleHandler = () => setDrawerOpen(!drawerOpen);

	return (
		<>
			<IconButton
				color="inherit"
				onClick={toggleHandler}
			>
				<AccountCircleIcon />
			</IconButton>
			<Drawer {...drawerProps}>
				<div>
					avatar
					<br />
					form and data ...
				</div>
				<div>
					<LanguageToggle />
					<br />
					<br />
					<ThemeToggle />
				</div>
			</Drawer>
		</>
	);
};

export default UserDrawer;
