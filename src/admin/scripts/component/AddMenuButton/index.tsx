import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

import routes from '../../routes';
import useBreadcrumbs from '../../hooks/useBreadcrumbs';
import useProfile from '../../hooks/useProfile';
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
	const { available_actions } = useProfile();
	const navigate = useNavigate();

	const optionsList = useMemo(() => {
		return [
			{
				key: 'users',
				label: t('model_new.Users'),
				onClick: () => navigate(`/admin/app/${routes.users.path}/detail/new`),
				disabled: !available_actions.Users.create,
				hidden: page === 'users',
			},
			{
				key: 'pages',
				label: t('model_new.Pages'),
				onClick: () => navigate(`/admin/app/${routes.pages.path}/detail/new`),
				disabled: !available_actions.Pages.create,
				hidden: page === 'pages',
			},
			{
				key: 'posts',
				label: t('model_new.Posts'),
				onClick: () => navigate(`/admin/app/${routes.posts.path}/detail/new`),
				disabled: !available_actions.Posts.create,
				hidden: page === 'posts',
			},
			{
				key: 'categories',
				label: t('model_new.Categories'),
				onClick: () => navigate(`/admin/app/${routes.categories.path}/detail/new`),
				disabled: !available_actions.Categories.create,
				hidden: page === 'categories',
			},
			{
				key: 'tags',
				label: t('model_new.Tags'),
				onClick: () => navigate(`/admin/app/${routes.tags.path}/detail/new`),
				disabled: !available_actions.Tags.create,
				hidden: page === 'tags',
			},
			{
				key: 'uploads',
				label: t('model_new.Uploads'),
				onClick: () => navigate(`/admin/app/${routes.uploads.path}/detail/new`),
				disabled: !available_actions.Uploads.create,
				hidden: page === 'uploads',
			},
			{
				key: 'menu',
				label: t('model_new.Menu'),
				onClick: () => navigate(`/admin/app/${routes.menu.path}/detail/new`),
				disabled: !available_actions.Menu.create,
				hidden: page === 'menu',
			},
			{
				key: 'members',
				label: t('model_new.Members'),
				onClick: () => navigate(`/admin/app/${routes.members.path}/detail/new`),
				disabled: !available_actions.Members.create,
				hidden: page === 'members',
			},
			{
				key: 'messages',
				label: t('model_new.Messages'),
				onClick: () => navigate(`/admin/app/${routes.messages.path}/detail/new`),
				disabled: !available_actions.Messages.create,
				hidden: page === 'messages',
			},
			{
				key: 'translations',
				label: t('model_new.Translations'),
				onClick: () => navigate(`/admin/app/${routes.translations.path}/detail/new`),
				disabled: !available_actions.Translations.create,
				hidden: page === 'translations',
			},
		];
	}, [ page, available_actions ]);
	const addButtonDisabled = useMemo(() => {
		let disabled = true;
		const item = optionsList.find((opt) => opt.key === page);
		if (item) disabled = !item.hidden;

		return disabled;
	}, [ page, optionsList ]);

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
							disabled={addButtonDisabled}
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
			options={optionsList}
		/>
	);
};

export default AddMenuButton;
