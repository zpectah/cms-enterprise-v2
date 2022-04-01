import React from 'react';
import { useNavigate, useMatch, useResolvedPath } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import { useTranslation } from 'react-i18next';
import {
	SvgIconProps,
	MenuList,
	MenuItem,
	ListItemText,
	ListItemIcon,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupIcon from '@mui/icons-material/Group';
import CategoryIcon from '@mui/icons-material/Category';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import MenuIcon from '@mui/icons-material/Menu';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import LanguageIcon from '@mui/icons-material/Language';
import MessageIcon from '@mui/icons-material/Message';

import routes from '../../../routes';
import useBreadcrumbs from '../../../hooks/useBreadcrumbs';
import useProfile from '../../../hooks/useProfile';

interface NavbarProps {
	onSidebarClose: () => void;
}

const Navbar = (props: NavbarProps) => {
	const { onSidebarClose } = props;

	const { t } = useTranslation(['pages']);
	const navigate = useNavigate();
	const breadcrumbs = useBreadcrumbs();
	const { available_actions } = useProfile();

	const root = '/admin/app';
	const iconProps: SvgIconProps = {
		fontSize: 'small'
	};
	const navItems = [
		{
			key: 'dashboard',
			path: root,
			label: routes.dashboard.label,
			icon: (<HomeIcon {...iconProps} />),
			active: true,
		},
		{
			key: 'settings',
			path: `${root}/${routes.settings.path}`,
			label: routes.settings.label,
			icon: (<SettingsIcon {...iconProps} />),
			active: available_actions.settings.view,
		},
		{
			key: 'users',
			path: `${root}/${routes.users.path}`,
			label: routes.users.label,
			icon: (<GroupIcon {...iconProps} />),
			active: available_actions.Users.view,
		},
		{
			key: 'pages',
			path: `${root}/${routes.pages.path}`,
			label: routes.pages.label,
			icon: (<AutoStoriesIcon {...iconProps} />),
			active: available_actions.Pages.view,
		},
		{
			key: 'posts',
			path: `${root}/${routes.posts.path}`,
			label: routes.posts.label,
			icon: (<AutoAwesomeMotionIcon {...iconProps} />),
			active: available_actions.Posts.view,
		},
		{
			key: 'translations',
			path: `${root}/${routes.translations.path}`,
			label: routes.translations.label,
			icon: (<LanguageIcon {...iconProps} />),
			active: available_actions.Translations.view,
		},
		{
			key: 'categories',
			path: `${root}/${routes.categories.path}`,
			label: routes.categories.label,
			icon: (<CategoryIcon {...iconProps} />),
			active: available_actions.Categories.view,
		},
		{
			key: 'tags',
			path: `${root}/${routes.tags.path}`,
			label: routes.tags.label,
			icon: (<BookmarkIcon {...iconProps} />),
			active: available_actions.Tags.view,
		},
		{
			key: 'uploads',
			path: `${root}/${routes.uploads.path}`,
			label: routes.uploads.label,
			icon: (<CloudDownloadIcon {...iconProps} />),
			active: available_actions.Uploads.view,
		},
		{
			key: 'menu',
			path: `${root}/${routes.menu.path}`,
			label: routes.menu.label,
			icon: (<MenuIcon {...iconProps} />),
			active: available_actions.Menu.view,
		},
		{
			key: 'members',
			path: `${root}/${routes.members.path}`,
			label: routes.members.label,
			icon: (<SupervisedUserCircleIcon {...iconProps} />),
			active: available_actions.Members.view,
		},
		{
			key: 'messages',
			path: `${root}/${routes.messages.path}`,
			label: routes.messages.label,
			icon: (<MessageIcon {...iconProps} />),
			active: available_actions.Messages.view,
		},
	];

	const clickHandler = (path: string) => {
		navigate(path);
		if (isMobile) onSidebarClose();
	};
	const isItemSelected = (key: string) => {
		return breadcrumbs.page === key;
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
				const selected = useMatch({ path: resolved.pathname, end: true }) || isItemSelected(key);

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