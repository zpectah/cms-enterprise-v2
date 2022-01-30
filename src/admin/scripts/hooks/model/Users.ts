import useSWR, { mutate } from 'swr';

import config from '../../config';
import { get, post } from '../../utils/api';
import { UsersItemProps } from '../../types/model';

const useUsers = () => {
	const { data, error } = useSWR(`${config.project.api.base_path}/get_users`, get);

	return {
		users: data?.data as UsersItemProps[],
		users_loading: !data && !error,
		users_error: error,
		reloadUsers: () => mutate(`${config.project.api.base_path}/get_users`),
		createUsers: (data: UsersItemProps) => post(`${config.project.api.base_path}/create_users`, data),
		updateUsers: (data: UsersItemProps) => post(`${config.project.api.base_path}/update_users`, data),
		toggleUsers: (data: (number | string)[]) => post(`${config.project.api.base_path}/toggle_users`, data),
		deleteUsers: (data: (number | string)[]) => post(`${config.project.api.base_path}/delete_users`, data),
	};
};

export default useUsers;