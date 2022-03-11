import React, { useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { styled } from '@mui/material';

import palette from '../../styles/palette';
import useProfile from '../../hooks/useProfile';
import {
	Drawer,
	Scrollable,
	DrawerProps,
} from '../../component/ui';
import ProfileForm from './ProfileForm';

const ProfileTrigger = styled('button')((theme) => `
	width: auto;
	height: auto;
	margin: 0;
	padding: 0;
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-size: 1.1rem;
	color: ${palette.light};
	background-color: transparent;
	border: 0;
	cursor: pointer;
	
	& span{
		padding-left: .5rem;
		padding-right: .5rem;		
		font-size: 1rem;		
		font-weight: 300;
	}
`);

const UserDrawer = () => {
	const [ drawerOpen, setDrawerOpen ] = useState<boolean>(false);
	const { profile } = useProfile();

	const drawerProps: DrawerProps = {
		// title: 'User profile',
		open: drawerOpen,
		onClose: () => setDrawerOpen(false),
		anchor: 'right',
		boxProps: {
			sx: {
				width: {
					xs: '100vw',
					md: '500px',
				}
			}
		},
	};

	const toggleHandler = () => setDrawerOpen(!drawerOpen);

	return (
		<>
			<ProfileTrigger
				type="button"
				onClick={toggleHandler}
			>
				<span>email</span>
				<AccountCircleIcon />
			</ProfileTrigger>
			<Drawer
				{...drawerProps}
			>
				<Scrollable>
					<ProfileForm model={profile} />
				</Scrollable>
			</Drawer>
		</>
	);
};

export default UserDrawer;
