import React, { useEffect } from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { MenuItemProps } from '../../types/model';
import { useMenu } from '../../hooks/model';
import useToasts from '../../hooks/useToasts';
import MenuList from './MenuList';
import MenuDetail from './MenuDetail';

const TranslationsModule = () => {
	const { t } = useTranslation([ 'messages' ]);
	const {
		menu,
		menu_loading,
		menu_error,
		reloadMenu,
		createMenu,
		updateMenu,
		toggleMenu,
		deleteMenu,
	} = useMenu();
	const params = useParams();
	const {
		createSuccessToast,
		createErrorToast,
	} = useToasts();

	const submitHandler = (method: 'create' | 'update', master: MenuItemProps) => {
		switch (method) {
			case 'create':
				return createMenu(master).then((resp) => {
					createSuccessToast({ title: t('messages:model.item_created') });
					reloadMenu();

					return resp;
				});

			case 'update':
				return updateMenu(master).then((resp) => {
					createSuccessToast({ title: t('messages:model.item_updated') });
					reloadMenu();

					return resp;
				});
		}
	};
	const deleteHandler = (master: number[]) => {
		return deleteMenu(master).then((resp) => {
			createSuccessToast({ title: master.length === 1 ? t('messages:model.item_deleted') : t('messages:model.items_deleted') });
			reloadMenu();

			return resp;
		});
	};
	const toggleHandler = (master: number[]) => {
		return toggleMenu(master).then((resp) => {
			createSuccessToast({ title: master.length === 1 ? t('messages:model.item_updated') : t('messages:model.items_updated') });
			reloadMenu();

			return resp;
		});
	};

	useEffect(() => {
		if (menu_error) createErrorToast({ title: menu_error });
	}, [ menu_error ]);

	return (
		<>
			<Routes>
				<Route path="detail/:id" element={
					<MenuDetail
						key={params['*']}
						dataItems={menu}
						onSubmit={submitHandler}
						onDelete={deleteHandler}
						loading={menu_loading}
					/>
				} />
				<Route index element={
					<MenuList
						dataItems={menu}
						onToggle={toggleHandler}
						onDelete={deleteHandler}
						loading={menu_loading}
					/>
				} />
			</Routes>
		</>
	);
};

export default TranslationsModule;
