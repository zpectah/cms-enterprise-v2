import React, { useEffect } from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Alert } from '@mui/material';

import { TagsItemProps } from '../../types/model';
import { useTags } from '../../hooks/model';
import useToasts from '../../hooks/useToasts';
import TagsList from './TagsList';
import TagsDetail from './TagsDetail';
import useProfile from '../../hooks/useProfile';

const TagsModule = () => {
	const { t } = useTranslation([ 'messages' ]);
	const {
		tags,
		tags_loading,
		tags_error,
		reloadTags,
		createTags,
		updateTags,
		toggleTags,
		deleteTags,
	} = useTags();
	const params = useParams();
	const {
		createSuccessToast,
		createErrorToast,
	} = useToasts();
	const { available_actions } = useProfile();

	const submitHandler = (method: 'create' | 'update', master: TagsItemProps) => {
		switch (method) {
			case 'create':
				return createTags(master).then((resp) => {
					createSuccessToast({ title: t('messages:model.item_created') });
					reloadTags();

					return resp;
				});

			case 'update':
				return updateTags(master).then((resp) => {
					createSuccessToast({ title: t('messages:model.item_updated') });
					reloadTags();

					return resp;
				});
		}
	};
	const deleteHandler = (master: number[]) => {
		return deleteTags(master).then((resp) => {
			createSuccessToast({ title: master.length === 1 ? t('messages:model.item_deleted') : t('messages:model.items_deleted') });
			reloadTags();

			return resp;
		});
	};
	const toggleHandler = (master: number[]) => {
		return toggleTags(master).then((resp) => {
			createSuccessToast({ title: master.length === 1 ? t('messages:model.item_updated') : t('messages:model.items_updated') });
			reloadTags();

			return resp;
		});
	};

	useEffect(() => {
		if (tags_error) createErrorToast({ title: tags_error });
	}, [ tags_error ]);

	return (
		<>
			{available_actions.Tags.view ? (
				<Routes>
					<Route path="detail/:id" element={
						<TagsDetail
							key={params['*']}
							dataItems={tags}
							onSubmit={submitHandler}
							onDelete={deleteHandler}
							loading={tags_loading}
							actions={available_actions.Tags}
						/>
					} />
					<Route index element={
						<TagsList
							dataItems={tags}
							onToggle={toggleHandler}
							onDelete={deleteHandler}
							loading={tags_loading}
							actions={available_actions.Tags}
						/>
					} />
				</Routes>
			) : (
				<Alert
					severity="warning"
					sx={{ width: '100%' }}
				>
					{t('messages:profile.user_missing_permission')}
				</Alert>
			)}
		</>
	);
};

export default TagsModule;
