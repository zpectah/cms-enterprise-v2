import useSWR, { mutate } from 'swr';

import config from '../../config';
import { get, post } from '../../utils/api';
import { CategoriesItemProps } from '../../types/model';

const useCategories = () => {
	const { data, error } = useSWR(`${config.project.api.base_path}/get_categories`, get);

	return {
		categories: data?.data as CategoriesItemProps[],
		categories_loading: !data && !error,
		categories_error: error,
		reloadCategories: () => mutate(`${config.project.api.base_path}/get_categories`),
		createCategories: (data: CategoriesItemProps) => post(`${config.project.api.base_path}/create_categories`, data),
		updateCategories: (data: CategoriesItemProps) => post(`${config.project.api.base_path}/update_categories`, data),
		toggleCategories: (data: number[]) => post(`${config.project.api.base_path}/toggle_categories`, data),
		deleteCategories: (data: number[]) => post(`${config.project.api.base_path}/delete_categories`, data),
	};
};

export default useCategories;
