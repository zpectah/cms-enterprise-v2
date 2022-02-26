import useSWR, { mutate } from 'swr';

import config from '../../config';
import { get, post } from '../../utils/api';
import { PagesItemProps } from '../../types/model';

const usePages = () => {
	const { data, error } = useSWR(`${config.project.api.base_path}/get_pages`, get);

	return {};
};

export default usePages;
