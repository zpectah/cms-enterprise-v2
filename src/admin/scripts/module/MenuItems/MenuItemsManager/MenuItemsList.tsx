import React from 'react';
import { Box } from '@mui/material';

import { MenuItemsItemModel } from '../../../types/model/MenuItems';
import MenuItemsListItem from './MenuItemsListItem';

export interface MenuItemsListProps {
	items: MenuItemsItemModel[];
	onEdit: (id: number) => void;
	onDelete: (id: number) => void;
	onToggle: (id: number) => Promise<unknown>;
}

const MenuItemsList = (props: MenuItemsListProps) => {
	const {
		items = [],
		onEdit,
		onDelete,
		onToggle,
	} = props;

	return (
		<Box
			sx={{
				mb: items.length > 0 ? 3 : 0,
			}}
		>
			{items?.map((item) => (
				<MenuItemsListItem
					key={item.id}
					detail={item}
					onEdit={onEdit}
					onDelete={onDelete}
					onToggle={onToggle}
				/>
			))}
		</Box>
	);
};

export default MenuItemsList;
