import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Box } from '@mui/material';

import { MenuItemsItemModel } from '../../../types/model/MenuItems';
import { useMenuItems } from '../../../hooks/model';
import useSettings from '../../../hooks/useSettings';
import {
	ConfirmDialog,
	AddButton,
	TextPreloader,
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
	const [ updating, setUpdating ] = useState(false);
	const [ confirmOpen, setConfirmOpen ] = useState(false);
	const [ confirmData, setConfirmData ] = useState<number[]>([]);
	const [ detailOpen, setDetailOpen ] = useState(false);
	const [ detailData, setDetailData ] = useState<MenuItemsItemModel | null>(null);
	const { settings } = useSettings();
	const languageActive = settings?.language_active;
	const {
		menuItems,
		createMenuItems,
		updateMenuItems,
		toggleMenuItems,
		deleteMenuItems,
		menuItemsWithChildren,
	} = useMenuItems();

	const loadMenuItems = async () => {
		setLoading(true);
		await menuItemsWithChildren(menuId as number).then((resp) => {
			setLoadedItems(resp?.data || []);
			setLoading(false);
		});
	};

	const confirmHandler = () => {
		setUpdating(true);
		const master = [ ...confirmData ];
		return deleteMenuItems(master).then((resp) => {
			loadMenuItems().then(() => {
				setUpdating(false);
				closeConfirmHandler();
			});
		});
	};
	const toggleHandler = (id: number) => {
		setUpdating(true);
		const master = [ id ];
		return toggleMenuItems(master).then((resp) => {
			loadMenuItems().then(() => {
				setUpdating(false);
				return resp;
			});
		});
	};
	const submitHandler = (master: MenuItemsItemModel) => {
		setUpdating(true);
		const method = master.id === 'new' ? 'create' : 'update';
		if (method === 'create') {
			return createMenuItems(master).then((resp) => {
				loadMenuItems().then(() => {
					setUpdating(false);
					return resp;
				});
			});
		} else if (method === 'update') {
			return updateMenuItems(master).then((resp) => {
				loadMenuItems().then(() => {
					setUpdating(false);
					return resp;
				});
			});
		}

		return new Promise<unknown>(() => {
			console.warn('no promise');
			setUpdating(false);
			return null;
		});
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
					<MenuItemsList
						items={loadedItems}
						onEdit={openDetailHandler}
						onDelete={openConfirmHandler}
						onToggle={toggleHandler}
					/>
					<AddButton
						onClick={() => openDetailHandler('new')}
						sx={{
							mb: 3,
						}}
						label={t('components:MenuItemsManager.btn.create_new')}
						variant="outlined"
					/>
					{loading || updating && (
						<Box sx={{ py: 2 }}>
							<TextPreloader />
						</Box>
					)}
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
