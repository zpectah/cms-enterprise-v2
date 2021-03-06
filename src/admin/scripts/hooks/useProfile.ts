import useSWR, { mutate } from 'swr';

import config from '../config';
import { USER_LEVEL_KEYS } from '../constants';
import EntityService from '../service/Entity.service';
import { get, post } from '../utils';
import { profileProps } from '../types/profile';
import { UsersItemProps } from '../types/model';

const useProfile = () => {
	const { data, error } = useSWR(`${config.project.api.base_path}/get_user_profile`, get);
	const entity = new EntityService(data?.data);
	const actions = entity.availableActions();

	return {
		profile: data?.data as profileProps,
		profile_loading: !data && !error,
		profile_error: error,
		available_actions: actions,
		reloadProfile: () => mutate(`${config.project.api.base_path}/get_user_profile`),
		updateProfile: (data: profileProps) => post(`${config.project.api.base_path}/update_user_profile`, data),
		userLogin: (data: { email: string; password: string }) => post(`${config.project.api.base_path}/user_login`, data),
		userLogout: () => post(`${config.project.api.base_path}/user_logout`, {}),
		userLostPassword: (data: { email: string }) => post(`${config.project.api.base_path}/user_lost_password`, data),
		userLostPasswordReset: (data: { token: string }) => post(`${config.project.api.base_path}/user_lost_password_reset`, data),
		userCreateNewPassword: (data: { password: string; token: string }) => post(`${config.project.api.base_path}/user_create_new_password`, data),
		compareUserForUpdate: (row: UsersItemProps) => {
			let can = actions.Users.update;
			if (row.item_level === USER_LEVEL_KEYS['admin']) {
				can = actions.Users.admin;
			}
			if (row.id === data?.data?.id) {
				can = true;
			}

			return can;
		},
		compareUserForDelete: (row: UsersItemProps) => {
			let can = actions.Users.delete;
			if (row.item_level === USER_LEVEL_KEYS['admin']) {
				can = actions.Users.admin;
			}
			if (row.id === data?.data?.id) {
				can = false;
			}

			return can;
		},
	};
};

export default useProfile;
