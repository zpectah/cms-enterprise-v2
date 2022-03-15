import config from '../config';
import { get, post } from '../utils/api';

const useSystem = () => {
	return {
		createLog: (data: any) => post(`${config.project.api.base_path}/create_log`, data),
		getLogList: () => get(`${config.project.api.base_path}/get_log_list`),
		installLanguage: (data: any) => post(`${config.project.api.base_path}/install_language`, data),
		exportData: (data: any) => post(`${config.project.api.base_path}/export_data`, data),
	};
};

export default useSystem;
