import useSWR, { mutate } from 'swr';

import config from '../../config';
import { get, post } from '../../utils/api';
import { UploadsItemProps } from '../../types/model';

const useUploads = () => {
	const { data, error } = useSWR(`${config.project.api.base_path}/get_uploads`, get);

	return {};
};

export default useUploads;
