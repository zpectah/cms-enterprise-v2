import useSWR, { mutate } from 'swr';

import config from '../../config';
import { get, post } from '../../utils/api';
import { UsersItemProps } from '../../types/model';

const useUsers = () => {
	// const { data, error } = useSWR(`${config.project.api.base_path}/get_users`, get);

	return {
		users: [
			// TODO: mock
			{
				id: 1,
				active: true,
				email: 'email1@email.com',
				name_first: 'John',
				name_last: 'Doe',
				nickname: 'johny',
			},
			{
				id: 2,
				active: true,
				email: 'email2@email.com',
				name_first: 'Franklin',
				name_last: 'Danielson',
				nickname: 'densa',
			},
			{
				id: 3,
				active: true,
				email: 'email3@email.com',
				name_first: 'Karel',
				name_last: 'Wagner',
				nickname: 'wagy',
			}
		] as UsersItemProps[],
		users_loading: false,
		users_error: false,
		reloadUsers: () => mutate(`${config.project.api.base_path}/get_users`),
		createUsers: (data: UsersItemProps) => {},
		updateUsers: (data: UsersItemProps) => {},
		toggleUsers: (data: (number | string)[]) => {},
		deleteUsers: (data: (number | string)[]) => {},
	};
};

export default useUsers;