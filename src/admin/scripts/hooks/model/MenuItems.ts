import useSWR, { mutate } from 'swr';

import config from '../../config';
import { get, post } from '../../utils/api';
import { MenuItemsItemProps } from '../../types/model';

const useMenuItems = () => {
	const { data, error } = useSWR(`${config.project.api.base_path}/get_menu_items`, get);

	return {};
};

export default useMenuItems;
