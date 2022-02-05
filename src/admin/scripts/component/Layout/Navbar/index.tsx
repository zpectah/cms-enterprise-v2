import React from 'react';
import { useNavigate, useMatch, useResolvedPath } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupIcon from '@mui/icons-material/Group';
import CategoryIcon from '@mui/icons-material/Category';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import MenuIcon from '@mui/icons-material/Menu';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import LanguageIcon from '@mui/icons-material/Language';

interface NavbarProps {
	onSidebarClose: () => void;
}

const Navbar = (props: NavbarProps) => {
	const { onSidebarClose } = props;
	const navigate = useNavigate();

	const navItems = [
		{
			key: 0,
			path: '/admin/app',
			label: 'Dashboard',
			icon: (<HomeIcon fontSize="small" />),
			active: true,
		},
		{
			key: 11,
			path: '/admin/app/settings',
			label: 'Settings',
			icon: (<SettingsIcon fontSize="small" />),
			active: true,
		},
		{
			key: 1,
			path: '/admin/app/users',
			label: 'Users',
			icon: (<GroupIcon fontSize="small" />),
			active: true,
		},
		{
			key: 2,
			path: '/admin/app/categories',
			label: 'Categories',
			icon: (<CategoryIcon fontSize="small" />),
			active: true,
		},
		{
			key: 3,
			path: '/admin/app/members',
			label: 'Members',
			icon: (<SupervisedUserCircleIcon fontSize="small" />),
			active: true,
		},
		{
			key: 4,
			path: '/admin/app/menu',
			label: 'Menu',
			icon: (<MenuIcon fontSize="small" />),
			active: true,
		},
		{
			key: 5,
			path: '/admin/app/pages',
			label: 'Pages',
			icon: (<AutoStoriesIcon fontSize="small" />),
			active: true,
		},
		{
			key: 6,
			path: '/admin/app/posts',
			label: 'Posts',
			icon: (<AutoAwesomeMotionIcon fontSize="small" />),
			active: true,
		},
		{
			key: 7,
			path: '/admin/app/posts-options',
			label: 'Posts options',
			icon: (<AnalyticsIcon fontSize="small" />),
			active: true,
		},
		{
			key: 8,
			path: '/admin/app/tags',
			label: 'Tags',
			icon: (<BookmarkIcon fontSize="small" />),
			active: true,
		},
		{
			key: 9,
			path: '/admin/app/translations',
			label: 'Translations',
			icon: (<LanguageIcon fontSize="small" />),
			active: true,
		},
		{
			key: 10,
			path: '/admin/app/uploads',
			label: 'Uploads',
			icon: (<CloudUploadIcon fontSize="small" />),
			active: true,
		},
	];

	const clickHandler = (path: string) => {
		navigate(path);
		if (isMobile) onSidebarClose();
	};

	return (
		<MenuList
			sx={{
				padding: 0,
			}}
		>
			{navItems.map((item) => {
				const {
					key,
					path,
					active,
					icon,
					label,
				} = item;
				const resolved = useResolvedPath(path);
				const selected = useMatch({ path: resolved.pathname, end: true });

				if (active) return (
					<MenuItem
						key={key}
						onClick={() => clickHandler(path)}
						className={[ selected && 'Mui-selected' ].join(',')}
						sx={{
							paddingTop: 1.25,
							paddingBottom: 1.25,
						}}
						divider
					>
						{icon && (
							<ListItemIcon>
								{icon}
							</ListItemIcon>
						)}
						<ListItemText>
							{label}
						</ListItemText>
					</MenuItem>
				);
			})}
		</MenuList>
	);
};

export default Navbar;