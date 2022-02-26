import useSWR, { mutate } from 'swr';

import config from '../../config';
import { get, post } from '../../utils/api';
import { TagsItemProps } from '../../types/model';

const useTags = () => {
	const { data, error } = useSWR(`${config.project.api.base_path}/get_tags`, get);

	return {};
};

export default useTags;
