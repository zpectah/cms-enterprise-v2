import React, { useEffect } from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Alert } from '@mui/material';

import { CategoriesItemProps } from '../../types/model';
import { useCategories } from '../../hooks/model';
import useToasts from '../../hooks/useToasts';
import CategoriesList from './CategoriesList';
import CategoriesDetail from './CategoriesDetail';
import useProfile from '../../hooks/useProfile';

const CategoriesModule = () => {
	const { t } = useTranslation([ 'messages' ]);
	const {
		categories,
		categories_loading,
		categories_error,
		reloadCategories,
		createCategories,
		updateCategories,
		toggleCategories,
		deleteCategories,
	} = useCategories();
	const params = useParams();
	const {
		createSuccessToast,
		createErrorToast,
	} = useToasts();
	const { available_actions } = useProfile();

	const submitHandler = (method: 'create' | 'update', master: CategoriesItemProps) => {
		switch (method) {
			case 'create':
				return createCategories(master).then((resp) => {
					createSuccessToast({ title: t('messages:model.item_created') });
					reloadCategories();

					return resp;
				});

			case 'update':
				return updateCategories(master).then((resp) => {
					createSuccessToast({ title: t('messages:model.item_updated') });
					reloadCategories();

					return resp;
				});
		}
	};
	const deleteHandler = (master: number[]) => {
		return deleteCategories(master).then((resp) => {
			createSuccessToast({ title: master.length === 1 ? t('messages:model.item_deleted') : t('messages:model.items_deleted') });
			reloadCategories();

			return resp;
		});
	};
	const toggleHandler = (master: number[]) => {
		return toggleCategories(master).then((resp) => {
			createSuccessToast({ title: master.length === 1 ? t('messages:model.item_updated') : t('messages:model.items_updated') });
			reloadCategories();

			return resp;
		});
	};

	useEffect(() => {
		if (categories_error) createErrorToast({ title: categories_error });
	}, [ categories_error ]);

	return (
		<>
			{available_actions.Categories.view ? (
				<Routes>
					<Route path="detail/:id" element={
						<CategoriesDetail
							key={params['*']}
							dataItems={categories}
							onSubmit={submitHandler}
							onDelete={deleteHandler}
							loading={categories_loading}
							actions={available_actions.Categories}
						/>
					} />
					<Route index element={
						<CategoriesList
							dataItems={categories}
							onToggle={toggleHandler}
							onDelete={deleteHandler}
							loading={categories_loading}
							actions={available_actions.Categories}
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

export default CategoriesModule;
