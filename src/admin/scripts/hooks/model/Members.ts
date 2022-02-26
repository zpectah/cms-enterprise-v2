import useSWR, { mutate } from 'swr';

import config from '../../config';
import { get, post } from '../../utils/api';
import { MembersItemProps } from '../../types/model';

const useMembers = () => {
	const { data, error } = useSWR(`${config.project.api.base_path}/get_members`, get);

	return {};
};

export default useMembers;
