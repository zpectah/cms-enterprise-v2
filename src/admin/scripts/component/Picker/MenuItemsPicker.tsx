import React, { useCallback } from 'react';

import { useMenuItems } from '../../hooks/model';
import PickerBase, { DefaultPickerBaseProps } from './Picker.Base';

export interface MenuItemsPickerProps extends DefaultPickerBaseProps {}

const MenuItemsPicker = (props: MenuItemsPickerProps) => {
	const {
		placeholder = 'Select menu items',
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
				list.push({
					key: item.id,
					value: item.id,
					label: item.name,
				});
			});
		}

		return list;
	}, [ menuItems ]);

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