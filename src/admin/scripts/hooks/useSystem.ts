import config from '../config';
import { get, post } from '../utils';

const useSystem = () => {
	return {
		createLog: (data: any) => post(`${config.project.api.base_path}/create_log`, data),
		getLogList: () => get(`${config.project.api.base_path}/get_log_list`),
		installLanguage: (data: { lang_source: string, lang_target: string, installed: string[] }) => post(`${config.project.api.base_path}/install_language`, data),
		exportData: (data: any) => post(`${config.project.api.base_path}/export_data`, data),
		deletePermanentItems: (data: any) => post(`${config.project.api.base_path}/delete_permanent_items`, data),
		deletePermanentFiles: (data: any) => post(`${config.project.api.base_path}/delete_permanent_files`, data),
	};
};

export default useSystem;
