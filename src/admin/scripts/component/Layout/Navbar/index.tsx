import React from 'react';
import { useNavigate, useMatch, useResolvedPath, useLocation } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import { useTranslation } from 'react-i18next';
import { SvgIconProps, MenuList, MenuItem, ListItemText, ListItemIcon } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupIcon from '@mui/icons-material/Group';
import CategoryIcon from '@mui/icons-material/Category';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import MenuIcon from '@mui/icons-material/Menu';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import LanguageIcon from '@mui/icons-material/Language';

import routes from '../../../routes';

interface NavbarProps {
	onSidebarClose: () => void;
}

const Navbar = (props: NavbarProps) => {
	const { onSidebarClose } = props;
	const { t } = useTranslation(['pages']);
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
			label: routes.dashboard.label,
			icon: (<HomeIcon {...iconProps} />),
			active: true,
		},
		{
			key: 1,
			path: `${root}/${routes.settings.path}`,
			label: routes.settings.label,
			icon: (<SettingsIcon {...iconProps} />),
			active: true,
		},
		{
			key: 2,
			path: `${root}/${routes.users.path}`,
			label: routes.users.label,
			icon: (<GroupIcon {...iconProps} />),
			active: true,
		},
		{
			key: 3,
			path: `${root}/${routes.pages.path}`,
			label: routes.pages.label,
			icon: (<AutoStoriesIcon {...iconProps} />),
			active: true,
		},
		{
			key: 4,
			path: `${root}/${routes.posts.path}`,
			label: routes.posts.label,
			icon: (<AutoAwesomeMotionIcon {...iconProps} />),
			active: true,
		},
		{
			key: 5,
			path: `${root}/${routes.translations.path}`,
			label: routes.translations.label,
			icon: (<LanguageIcon {...iconProps} />),
			active: true,
		},
		{
			key: 6,
			path: `${root}/${routes.categories.path}`,
			label: routes.categories.label,
			icon: (<CategoryIcon {...iconProps} />),
			active: true,
		},
		{
			key: 7,
			path: `${root}/${routes.tags.path}`,
			label: routes.tags.label,
			icon: (<BookmarkIcon {...iconProps} />),
			active: true,
		},
		{
			key: 8,
			path: `${root}/${routes.uploads.path}`,
			label: routes.uploads.label,
			icon: (<CloudUploadIcon {...iconProps} />),
			active: true,
		},
		{
			key: 9,
			path: `${root}/${routes.menu.path}`,
			label: routes.menu.label,
			icon: (<MenuIcon {...iconProps} />),
			active: true,
		},
		{
			key: 10,
			path: `${root}/${routes.members.path}`,
			label: routes.members.label,
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
						<ListItemText sx={{ fontSize: '.9rem' }}>
							{t(`pages:${label}`)}
						</ListItemText>
					</MenuItem>
				);
			})}
		</MenuList>
	);
};

export default Navbar;