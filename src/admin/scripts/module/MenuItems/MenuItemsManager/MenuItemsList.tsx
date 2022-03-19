import React from 'react';

import { MenuItemsItemModel } from '../../../types/model/MenuItems';
import MenuItemsListItem from './MenuItemsListItem';

export interface MenuItemsListProps {
	items: MenuItemsItemModel[];
	onEdit: (id: number) => void;
	onDelete: (id: number) => void;
}

const MenuItemsList = (props: MenuItemsListProps) => {
	const {
		items = [],
		onEdit,
		onDelete,
	} = props;

	return (
		<div>
			{items?.map((item) => (
				<MenuItemsListItem
					detail={item}
					onEdit={onEdit}
					onDelete={onDelete}
				/>
			))}
		</div>
	);
};

export default MenuItemsList;
