import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';

import { sidebarToggle } from '../../store/actions';
import { appStoreProps } from '../../types/store';

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
			<Button variant="outlined" color="secondary" onClick={toggleSidebar}>
				Sidebar
			</Button>
		</>
	);
};

export default SidebarToggle;
