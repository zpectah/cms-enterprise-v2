import useSWR, { mutate } from 'swr';

import config from '../../config';
import { get, post, checkDuplicates } from '../../utils';
import { PostsItemProps } from '../../types/model';

const usePosts = () => {
	const { data, error } = useSWR(`${config.project.api.base_path}/get_posts`, get);

	return {
		posts: data?.data as PostsItemProps[],
		posts_loading: !data && !error,
		posts_error: error,
		reloadPosts: () => mutate(`${config.project.api.base_path}/get_posts`),
		createPosts: (data: PostsItemProps) => post(`${config.project.api.base_path}/create_posts`, data),
		updatePosts: (data: PostsItemProps) => post(`${config.project.api.base_path}/update_posts`, data),
		togglePosts: (data: number[]) => post(`${config.project.api.base_path}/toggle_posts`, data),
		deletePosts: (data: number[]) => post(`${config.project.api.base_path}/delete_posts`, data),
		checkPostsDuplicates: (id: number, value: string) => checkDuplicates(data?.data, id, 'name', value),
	};
};

export default usePosts;
