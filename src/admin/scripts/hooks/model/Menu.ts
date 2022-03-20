import useSWR, { mutate } from 'swr';

import config from '../../config';
import { get, post, checkDuplicates } from '../../utils';
import { MenuItemProps } from '../../types/model';

const useMenu = () => {
	const { data, error } = useSWR(`${config.project.api.base_path}/get_menu`, get);

	return {
		menu: data?.data as MenuItemProps[],
		menu_loading: !data && !error,
		menu_error: error,
		reloadMenu: () => mutate(`${config.project.api.base_path}/get_menu`),
		createMenu: (data: MenuItemProps) => post(`${config.project.api.base_path}/create_menu`, data),
		updateMenu: (data: MenuItemProps) => post(`${config.project.api.base_path}/update_menu`, data),
		toggleMenu: (data: number[]) => post(`${config.project.api.base_path}/toggle_menu`, data),
		deleteMenu: (data: number[]) => post(`${config.project.api.base_path}/delete_menu`, data),
		checkMenuDuplicates: (id: number, value: string) => checkDuplicates(data?.data, id, 'name', value),
	};
};

export default useMenu;
