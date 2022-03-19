import React from 'react';

import { MenuItemsItemModel } from '../../../types/model/MenuItems';

export interface MenuItemsListItemProps {
	detail: MenuItemsItemModel;
	onEdit: (id: number) => void;
	onDelete: (id: number) => void;
}

const MenuItemsListItem = (props: MenuItemsListItemProps) => {
	const {
		detail,
		onEdit,
		onDelete,
	} = props;

	return (
		<div>
			MenuItemsListItem
			... {JSON.stringify(detail, null, 2)}
		</div>
	);
};

export default MenuItemsListItem;
