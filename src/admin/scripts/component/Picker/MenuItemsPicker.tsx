import React, { useCallback } from 'react';

import { useMenuItems } from '../../hooks/model';
import PickerBase, { DefaultPickerBaseProps } from './Picker.Base';

export interface MenuItemsPickerProps extends DefaultPickerBaseProps {
	menuId: number;
}

const MenuItemsPicker = (props: MenuItemsPickerProps) => {
	const {
		placeholder = 'Select menu items',
		menuId,
		...rest
	} = props;

	const {
		menuItems,
		menuItems_loading,
	} = useMenuItems();

	const getOptionsList = useCallback(() => {
		const list = [];
		if (menuItems && menuItems.length > 0) {
			menuItems.map((item) => {
				if (menuId == item.menu_id) list.push({
					key: item.id,
					value: item.id,
					label: item.name,
				});
			});
		}

		return list;
	}, [ menuId, menuItems ]);

	return (
		<>
			<PickerBase
				loading={menuItems_loading}
				options={getOptionsList()}
				placeholder={placeholder}
				{...rest}
			/>
		</>
	);
};

export default MenuItemsPicker;