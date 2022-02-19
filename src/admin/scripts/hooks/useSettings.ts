import useSWR, { mutate } from 'swr';

import config from '../config';
import { get, post } from '../utils/api';

export default () => {
	const { data, error } = useSWR(`${config.project.api.base_path}/get_cms_settings`, get);

	return {
		settings: data?.data as any, // TODO
		settings_loading: !data && !error,
		settings_error: error,
		reloadSettings: () => mutate(`${config.project.api.base_path}/get_cms_settings`),
		updateSettings: (data: any) => post(`${config.project.api.base_path}/update_cms_settings`, data),
	};
};
