import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

import routes from '../../routes';
import useBreadcrumbs from '../../hooks/useBreadcrumbs';
import {
	ButtonGroup,
	SuccessButton,
	AddButton,
	DropdownMenu,
} from '../ui';

export interface AddMenuButtonProps {
	addLabel?: string;
	addCallback?: () => void;
}

const AddMenuButton = (props: AddMenuButtonProps) => {
	const {
		addLabel,
		addCallback,
	} = props;

	const { t } = useTranslation();
	const { page } = useBreadcrumbs();
	const navigate = useNavigate();

	const getOptions = useCallback(() => {
		return [
			{
				key: 'users',
				label: t('model_new.Users'),
				onClick: () => navigate(`/admin/app/${routes.users.path}/detail/new`),
				hidden: page === 'users',
			},
			{
				key: 'pages',
				label: t('model_new.Pages'),
				onClick: () => navigate(`/admin/app/${routes.pages.path}/detail/new`),
				hidden: page === 'pages',
			},
			{
				key: 'posts',
				label: t('model_new.Posts'),
				onClick: () => navigate(`/admin/app/${routes.posts.path}/detail/new`),
				hidden: page === 'posts',
			},
			{
				key: 'categories',
				label: t('model_new.Categories'),
				onClick: () => navigate(`/admin/app/${routes.categories.path}/detail/new`),
				hidden: page === 'categories',
			},
			{
				key: 'tags',
				label: t('model_new.Tags'),
				onClick: () => navigate(`/admin/app/${routes.tags.path}/detail/new`),
				hidden: page === 'tags',
			},
			{
				key: 'uploads',
				label: t('model_new.Uploads'),
				onClick: () => navigate(`/admin/app/${routes.uploads.path}/detail/new`),
				hidden: page === 'uploads',
			},
			{
				key: 'menu',
				label: t('model_new.Menu'),
				onClick: () => navigate(`/admin/app/${routes.menu.path}/detail/new`),
				hidden: page === 'menu',
			},
			{
				key: 'members',
				label: t('model_new.Members'),
				onClick: () => navigate(`/admin/app/${routes.members.path}/detail/new`),
				hidden: page === 'members',
			},
			{
				key: 'messages',
				label: t('model_new.Messages'),
				onClick: () => navigate(`/admin/app/${routes.messages.path}/detail/new`),
				hidden: page === 'messages',
			},
			{
				key: 'translations',
				label: t('model_new.Translations'),
				onClick: () => navigate(`/admin/app/${routes.translations.path}/detail/new`),
				hidden: page === 'translations',
			},
		];
	}, [ page ]);

	return (
		<DropdownMenu
			id="AddMenuButton"
			renderButton={(renderProps, open) => {
				const { ...rest } = renderProps;

				return (
					<ButtonGroup>
						<AddButton
							label={addLabel}
							onClick={addCallback}
						/>
						<SuccessButton
							sx={{
								paddingLeft: '.5rem',
								paddingRight: '.5rem',
							}}
							{...rest}
						>
							{open ? (
								<ExpandLessIcon fontSize="small" />
							) : (
								<ExpandMoreIcon fontSize="small" />
							)}
						</SuccessButton>

					</ButtonGroup>
				);
			}}
			options={getOptions()}
		/>
	);
};

export default AddMenuButton;
