import useSWR, { mutate } from 'swr';

import config from '../../config';
import { get, post } from '../../utils/api';
import { MembersItemProps } from '../../types/model';

const useMembers = () => {
	const { data, error } = useSWR(`${config.project.api.base_path}/get_members`, get);

	return {
		members: data?.data as MembersItemProps[],
		members_loading: !data && !error,
		members_error: error,
		reloadMembers: () => mutate(`${config.project.api.base_path}/get_members`),
		createMembers: (data: MembersItemProps) => post(`${config.project.api.base_path}/create_members`, data),
		updateMembers: (data: MembersItemProps) => post(`${config.project.api.base_path}/update_members`, data),
		toggleMembers: (data: number[]) => post(`${config.project.api.base_path}/toggle_members`, data),
		deleteMembers: (data: number[]) => post(`${config.project.api.base_path}/delete_members`, data),
	};
};

export default useMembers;
