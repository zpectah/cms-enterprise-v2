import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {
	styled,
	Menu,
	MenuItem,
	Divider,
} from '@mui/material';

import palette from '../../styles/palette';
import useProfile from '../../hooks/useProfile';
import useToasts from '../../hooks/useToasts';
import { ConfirmDialog } from '../../component/ui';

const ProfileTrigger = styled('button')((theme) => `
	width: auto;
	height: 42px;
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
		font-size: .9rem;		
		font-weight: 300;
	}
`);

const ProfileDropdown = () => {
	const { t } = useTranslation([ 'components' ]);
	const [ confirmOpen, setConfirmOpen ] = useState(false);
	const navigate = useNavigate();
	const {
		profile,
		userLogout,
	} = useProfile();
	const {
		createSuccessToast,
	} = useToasts();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const openHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const closeHandler = () => {
		setAnchorEl(null);
	};
	const clickHandler = (path: string) => {
		navigate(path);
		closeHandler();
	};
	const logoutHandler = () => {
		setConfirmOpen(true);
		closeHandler();
	};
	const logoutHandlerConfirm = () => {
		userLogout().then((resp) => {
			navigate('/admin/login');
			createSuccessToast({ title: t('messages:profile.user_logout_success') });
		});
	};

	return (
		<>
			<ProfileTrigger
				type="button"
				id="profile-trigger"
				aria-controls={open ? 'profile-trigger-menu' : undefined}
				aria-haspopup="true"
				aria-expanded={open ? 'true' : undefined}
				onClick={openHandler}
			>
				<span>{profile?.email}</span>
				<AccountCircleIcon />
			</ProfileTrigger>
			<Menu
				id="profile-trigger-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={closeHandler}
				MenuListProps={{
					'aria-labelledby': 'profile-trigger',
				}}
				PaperProps={{
					sx: {
						width: '150px',
					}
				}}
				sx={{}}
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "right",
				}}
			>
				<MenuItem
					onClick={() => clickHandler('/admin/app/profile')}
				>
					{t('components:ProfileDropdown.label.profile')}
				</MenuItem>
				{/*
				<MenuItem
					onClick={() => clickHandler('/admin/app/help')}
				>
					{t('components:ProfileDropdown.label.help')}
				</MenuItem>
				*/}
				<Divider />
				<MenuItem
					onClick={logoutHandler}
				>
					{t('components:ProfileDropdown.label.logout')}
				</MenuItem>
			</Menu>
			<ConfirmDialog
				context="logout"
				onConfirm={logoutHandlerConfirm}
				open={confirmOpen}
				onClose={() => setConfirmOpen(false)}
			/>
		</>
	);
};

export default ProfileDropdown;
