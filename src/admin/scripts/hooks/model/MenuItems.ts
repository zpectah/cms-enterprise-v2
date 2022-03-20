import useSWR, { mutate } from 'swr';

import config from '../../config';
import { get, post, checkDuplicates } from '../../utils';
import { MenuItemsItemProps } from '../../types/model';

const useMenuItems = () => {
	const { data, error } = useSWR(`${config.project.api.base_path}/get_menu_items`, get);

	return {
		menuItems: data?.data as MenuItemsItemProps[],
		menuItems_loading: !data && !error,
		menuItems_error: error,
		reloadMenuItems: () => mutate(`${config.project.api.base_path}/get_menu_items`),
		createMenuItems: (data: MenuItemsItemProps) => post(`${config.project.api.base_path}/create_menu_items`, data),
		updateMenuItems: (data: MenuItemsItemProps) => post(`${config.project.api.base_path}/update_menu_items`, data),
		toggleMenuItems: (data: number[]) => post(`${config.project.api.base_path}/toggle_menu_items`, data),
		deleteMenuItems: (data: number[]) => post(`${config.project.api.base_path}/delete_menu_items`, data),
		menuItemsWithChildren: (menuId: number) => get(`${config.project.api.base_path}/get_menu_items?with_children=true&menu_id=${menuId}`),
		checkMenuItemsDuplicates: (id: number, value: string) => checkDuplicates(data?.data, id, 'name', value),
	};
};

export default useMenuItems;
