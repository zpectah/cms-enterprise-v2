import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert } from '@mui/material';

import { MenuItemsItemModel } from '../../../types/model/MenuItems';
import { useMenuItems } from '../../../hooks/model';
import useSettings from '../../../hooks/useSettings';
import {
	ConfirmDialog,
	AddButton,
} from '../../../component/ui';
import MenuItemsDetail from './MenuItemsDetail';
import MenuItemsList from './MenuItemsList';
import { getDetailData } from '../../../utils';

export interface MenuItemsManagerProps {
	menuId: number | 'new';
}

const MenuItemsManager = (props: MenuItemsManagerProps) => {
	const {
		menuId,
	} = props;

	const { t } = useTranslation([ 'components' ]);
	const [ loadedItems, setLoadedItems ] = useState<MenuItemsItemModel[]>([]);
	const [ loading, setLoading ] = useState(false);
	const [ confirmOpen, setConfirmOpen ] = useState(false);
	const [ confirmData, setConfirmData ] = useState<number[]>([]);
	const [ detailOpen, setDetailOpen ] = useState(false);
	const [ detailData, setDetailData ] = useState<MenuItemsItemModel | null>(null);
	const { settings } = useSettings();
	const languageActive = settings?.language_active;
	const {
		menuItems,
		menuItemsWithChildren,
	} = useMenuItems();

	const loadMenuItems = async () => {
		setLoading(true);
		await menuItemsWithChildren(menuId as number).then((resp) => {
			setLoadedItems(resp?.data?.reverse() || []);
			setLoading(false);
		});
	};

	const confirmHandler = () => {
		const master = [ ...confirmData ];
		console.log('onConfirmHandler', master);
		// TODO ... deleteMenuItems
		closeConfirmHandler();
	};
	const submitHandler = (master: MenuItemsItemModel) => {
		console.log('on submit', master);
		// TODO ... submit (create / update)
	};
	const openConfirmHandler = (id: number) => {
		setConfirmOpen(true);
		setConfirmData([ id ]);
	};
	const closeConfirmHandler = () => {
		setConfirmOpen(false);
		setConfirmData([]);
	};
	const openDetailHandler = (id: number | 'new') => {
		setDetailData(getDetailData(
			'MenuItems',
			menuItems,
			id,
			languageActive,
			{
				label: '',
			}
		));
		setDetailOpen(true);
	};
	const closeDetailHandler = () => {
		setDetailOpen(false);
		setDetailData(null);
	};

	useEffect(() => {
		if (menuId !== 'new') loadMenuItems();

		return () => {};
	}, [ menuId ]);

	return (
		<>
			{menuId === 'new' ? (
				<Alert
					severity="info"
				>
					{t('components:MenuItemsManager.no_menu_created')}
				</Alert>
			) : (
				<>
					<AddButton
						onClick={() => openDetailHandler('new')}
						sx={{
							mb: 2,
						}}
						label={t('components:MenuItemsManager.btn.create_new')}
						variant="outlined"
					/>
					<MenuItemsList
						items={loadedItems}
						onEdit={openDetailHandler}
						onDelete={openConfirmHandler}
					/>
					<MenuItemsDetail
						detailData={detailData}
						open={detailOpen}
						onClose={closeDetailHandler}
						menuId={menuId as number}
						onSubmit={submitHandler}
					/>
					<ConfirmDialog
						context="delete"
						open={confirmOpen}
						confirmData={confirmData}
						onConfirm={confirmHandler}
						onClose={closeConfirmHandler}
					/>
				</>
			)}
		</>
	);
};

export default MenuItemsManager;
