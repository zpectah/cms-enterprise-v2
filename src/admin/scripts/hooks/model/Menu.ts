import useSWR, { mutate } from 'swr';

import config from '../../config';
import { get, post } from '../../utils/api';
import { MenuItemProps } from '../../types/model';

const useMenu = () => {
	const { data, error } = useSWR(`${config.project.api.base_path}/get_menu`, get);

	return {};
};

export default useMenu;
