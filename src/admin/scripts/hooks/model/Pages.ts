import useSWR, { mutate } from 'swr';

import config from '../../config';
import { get, post } from '../../utils/api';
import { PagesItemProps } from '../../types/model';

const usePages = () => {
	const { data, error } = useSWR(`${config.project.api.base_path}/get_pages`, get);

	return {
		pages: data?.data as PagesItemProps[],
		pages_loading: !data && !error,
		pages_error: error,
		reloadPages: () => mutate(`${config.project.api.base_path}/get_pages`),
		createPages: (data: PagesItemProps) => post(`${config.project.api.base_path}/create_pages`, data),
		updatePages: (data: PagesItemProps) => post(`${config.project.api.base_path}/update_pages`, data),
		togglePages: (data: number[]) => post(`${config.project.api.base_path}/toggle_pages`, data),
		deletePages: (data: number[]) => post(`${config.project.api.base_path}/delete_pages`, data),
	};
};

export default usePages;
