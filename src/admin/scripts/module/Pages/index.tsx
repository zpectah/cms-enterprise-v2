import React, { useEffect } from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { CategoriesItemProps } from '../../types/model';
import { usePages } from '../../hooks/model';
import useToasts from '../../hooks/useToasts';
import PagesList from './PagesList';
import PagesDetail from './PagesDetail';

const PagesModule = () => {
	const { t } = useTranslation([ 'messages' ]);
	const {
		pages,
		pages_loading,
		pages_error,
		reloadPages,
		createPages,
		updatePages,
		togglePages,
		deletePages,
	} = usePages();
	const params = useParams();
	const {
		createSuccessToast,
		createErrorToast,
	} = useToasts();

	const submitHandler = (method: 'create' | 'update', master: CategoriesItemProps) => {
		switch (method) {
			case 'create':
				return createPages(master).then((resp) => {
					createSuccessToast({ title: t('messages:model.item_created') });
					reloadPages();

					return resp;
				});

			case 'update':
				return updatePages(master).then((resp) => {
					createSuccessToast({ title: t('messages:model.item_updated') });
					reloadPages();

					return resp;
				});
		}
	};
	const deleteHandler = (master: number[]) => {
		return deletePages(master).then((resp) => {
			createSuccessToast({ title: master.length === 1 ? t('messages:model.item_deleted') : t('messages:model.items_deleted') });
			reloadPages();

			return resp;
		});
	};
	const toggleHandler = (master: number[]) => {
		return togglePages(master).then((resp) => {
			createSuccessToast({ title: master.length === 1 ? t('messages:model.item_updated') : t('messages:model.items_updated') });
			reloadPages();

			return resp;
		});
	};

	useEffect(() => {
		if (pages_error) createErrorToast({ title: pages_error });
	}, [ pages_error ]);

	return (
		<>
			<Routes>
				<Route path="detail/:id" element={
					<PagesDetail
						key={params['*']}
						dataItems={pages}
						onSubmit={submitHandler}
						onDelete={deleteHandler}
						loading={pages_loading}
					/>
				} />
				<Route index element={
					<PagesList
						dataItems={pages}
						onToggle={toggleHandler}
						onDelete={deleteHandler}
						loading={pages_loading}
					/>
				} />
			</Routes>
		</>
	);
};

export default PagesModule;
