import useSWR, { mutate } from 'swr';

import config from '../../config';
import { get, post } from '../../utils/api';
import { CategoriesItemProps } from '../../types/model';

const useCategories = () => {
	const { data, error } = useSWR(`${config.project.api.base_path}/get_categories`, get);

	return {};
};

export default useCategories;
