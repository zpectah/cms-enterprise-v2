import useSWR, { mutate } from 'swr';

import config from '../../config';
import { get, post } from '../../utils/api';
import { CommentsItemProps } from '../../types/model';

const useComments = () => {
	const { data, error } = useSWR(`${config.project.api.base_path}/get_comments`, get);

	return {};
};

export default useComments;
