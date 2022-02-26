import useSWR, { mutate } from 'swr';

import config from '../../config';
import { get, post } from '../../utils/api';
import { PostsItemProps } from '../../types/model';

const usePosts = () => {
	const { data, error } = useSWR(`${config.project.api.base_path}/get_posts`, get);

	return {};
};

export default usePosts;
