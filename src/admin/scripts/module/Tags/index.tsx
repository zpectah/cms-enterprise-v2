import React, { useEffect } from 'react';
import _ from 'lodash';
import { Routes, Route, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { TagsItemProps } from '../../types/model';
import { useTags } from '../../hooks/model';
import useToasts from '../../hooks/useToasts';
import transformString from '../../utils/transformString';
import TagsList from './TagsList';
import TagsDetail from './TagsDetail';

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

	const submitHandler = (method: 'create' | 'update', data: TagsItemProps) => {
		const master: TagsItemProps = _.cloneDeep(data);
		master.name = transformString(master.name, 'empty-dash');
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
	const deleteHandler = (ids: number[]) => {
		const master = [ ...ids ];
		return deleteTags(master).then((resp) => {
			createSuccessToast({ title: master.length === 1 ? t('messages:model.item_deleted') : t('messages:model.items_deleted') });
			reloadTags();

			return resp;
		});
	};
	const toggleHandler = (ids: number[]) => {
		const master = [ ...ids ];
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
			<Routes>
				<Route path="detail/:id" element={
					<TagsDetail
						key={params['*']}
						dataItems={tags}
						onSubmit={submitHandler}
						onDelete={deleteHandler}
						loading={tags_loading}
					/>
				} />
				<Route index element={
					<TagsList
						dataItems={tags}
						onToggle={toggleHandler}
						onDelete={deleteHandler}
						loading={tags_loading}
					/>
				} />
			</Routes>
		</>
	);
};

export default TagsModule;
