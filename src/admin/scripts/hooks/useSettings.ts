import useSWR, { mutate } from 'swr';

import config from '../config';
import { get, post } from '../utils';
import { settingsProps } from '../types/app';

const useSettings = () => {
	const { data, error } = useSWR(`${config.project.api.base_path}/get_cms_settings`, get);

	return {
		settings: data?.data as settingsProps,
		settings_loading: !data && !error,
		settings_error: error,
		reloadSettings: () => mutate(`${config.project.api.base_path}/get_cms_settings`),
		updateSettings: (data: settingsProps) => post(`${config.project.api.base_path}/update_cms_settings`, data),
	};
};

export default useSettings;
