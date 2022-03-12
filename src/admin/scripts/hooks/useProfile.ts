import useSWR, { mutate } from 'swr';

import config from '../config';
import { get, post } from '../utils/api';
import { profileProps } from '../types/profile';

const useProfile = () => {
	const { data, error } = useSWR(`${config.project.api.base_path}/get_user_profile`, get);
	const data_loading = !(!(!data && data == null) && !error);

	return {
		// profile: data as unknown | profileProps,
		profile: {
			id: 1,
			type: 'default',
			email: 'demo@demo.demo',
			name_first: 'Demo',
			name_last: 'Demo',
			nickname: 'demo',
			password: '',
			item_group: 'company',
			description: '',
			img_avatar: '',
			item_level: 7,
			active: true,
		},
		profile_loading: data_loading,
		profile_error: error,
		reloadProfile: () => mutate(`${config.project.api.base_path}/get_user_profile`),
		updateProfile: (data: profileProps) => post(`${config.project.api.base_path}/update_user_profile`, data),
		userLogin: (data: { email: string; password: string }) => post(`${config.project.api.base_path}/user_login`, data),
		userLogout: () => post(`${config.project.api.base_path}/user_logout`, {}),
		userLostPassword: (data: { email: string }) => post(`${config.project.api.base_path}/user_lost_password`, data),
		userLostPasswordReset: (data: { token: string }) => post(`${config.project.api.base_path}/user_lost_password_reset`, data),
		userCreateNewPassword: (data: { password: string; token: string }) => post(`${config.project.api.base_path}/user_create_new_password`, data),
	};
};

export default useProfile;
