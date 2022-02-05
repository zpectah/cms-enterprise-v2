import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';

import { sidebarToggle } from '../../store/actions';
import { appStoreProps } from '../../types/store';
import { Button, IconButton } from '../ui';

interface SidebarToggleProps {}

const SidebarToggle = (props: SidebarToggleProps) => {
	const {} = props;
	const { sidebarOpen } = useSelector((store: appStoreProps) => store);
	const dispatch = useDispatch();

	const toggleSidebar = () => {
		dispatch(sidebarToggle(!sidebarOpen));
	};

	return (
		<>
			<IconButton
				color="secondary"
				onClick={toggleSidebar}
			>
				{sidebarOpen ? (
					<MenuOpenIcon />
				) : (
					<MenuIcon />
				)}
			</IconButton>
		</>
	);
};

export default SidebarToggle;
