import useSWR, { mutate } from 'swr';

import config from '../../config';
import { get, post } from '../../utils/api';
import { TagsItemProps } from '../../types/model';

const useTags = () => {
	const { data, error } = useSWR(`${config.project.api.base_path}/get_tags`, get);

	return {
		tags: data?.data as TagsItemProps[],
		tags_loading: !data && !error,
		tags_error: error,
		reloadTags: () => mutate(`${config.project.api.base_path}/get_tags`),
		createTags: (data: TagsItemProps) => post(`${config.project.api.base_path}/create_tags`, data),
		updateTags: (data: TagsItemProps) => post(`${config.project.api.base_path}/update_tags`, data),
		toggleTags: (data: number[]) => post(`${config.project.api.base_path}/toggle_tags`, data),
		deleteTags: (data: number[]) => post(`${config.project.api.base_path}/delete_tags`, data),
	};
};

export default useTags;
