import React from 'react';
import { useNavigate, useMatch, useResolvedPath, useLocation } from 'react-router-dom';
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
import { SvgIconProps } from '@mui/material';

interface NavbarProps {
	onSidebarClose: () => void;
}

const Navbar = (props: NavbarProps) => {
	const { onSidebarClose } = props;
	const navigate = useNavigate();
	// const location = useLocation();

	const root = '/admin/app';
	const iconProps: SvgIconProps = {
		fontSize: 'small'
	};
	const navItems = [
		{
			key: 0,
			path: root,
			label: 'Dashboard',
			icon: (<HomeIcon {...iconProps} />),
			active: true,
		},
		{
			key: 1,
			path: `${root}/settings`,
			label: 'Settings',
			icon: (<SettingsIcon {...iconProps} />),
			active: true,
		},
		{
			key: 2,
			path: `${root}/users`,
			label: 'Users',
			icon: (<GroupIcon {...iconProps} />),
			active: true,
		},
		{
			key: 3,
			path: `${root}/pages`,
			label: 'Pages',
			icon: (<AutoStoriesIcon {...iconProps} />),
			active: true,
		},
		{
			key: 4,
			path: `${root}/posts`,
			label: 'Posts',
			icon: (<AutoAwesomeMotionIcon {...iconProps} />),
			active: true,
		},
		{
			key: 5,
			path: `${root}/translations`,
			label: 'Translations',
			icon: (<LanguageIcon {...iconProps} />),
			active: true,
		},
		{
			key: 6,
			path: `${root}/categories`,
			label: 'Categories',
			icon: (<CategoryIcon {...iconProps} />),
			active: true,
		},
		{
			key: 7,
			path: `${root}/tags`,
			label: 'Tags',
			icon: (<BookmarkIcon {...iconProps} />),
			active: true,
		},
		{
			key: 8,
			path: `${root}/uploads`,
			label: 'Uploads',
			icon: (<CloudUploadIcon {...iconProps} />),
			active: true,
		},
		{
			key: 9,
			path: `${root}/menu`,
			label: 'Menu',
			icon: (<MenuIcon {...iconProps} />),
			active: true,
		},
		{
			key: 10,
			path: `${root}/posts-options`,
			label: 'Posts options',
			icon: (<AnalyticsIcon {...iconProps} />),
			active: true,
		},
		{
			key: 11,
			path: `${root}/members`,
			label: 'Members',
			icon: (<SupervisedUserCircleIcon {...iconProps} />),
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
				// const parsedPath = location.pathname.split('/');
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
							paddingTop: 1.35,
							paddingBottom: 1.35,
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