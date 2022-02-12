import React, { useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import {
	IconButton,
	Drawer,
} from '../../component/ui';
import { DrawerProps } from '../../component/ui/Drawer/Drawer';
import ThemeToggle from '../../component/ThemeToggle';
import LanguageToggle from '../../component/LanguageToggle';
import ProfileForm from './ProfileForm';

const UserDrawer = () => {
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
					<ProfileForm />
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
