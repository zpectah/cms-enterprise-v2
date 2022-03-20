import useSWR, { mutate } from 'swr';

import config from '../../config';
import { get, post, checkDuplicates } from '../../utils';
import { VisitorBlacklistItemProps } from '../../types/model';

const useVisitorBlacklist = () => {
	const { data, error } = useSWR(`${config.project.api.base_path}/get_visitor_blacklist`, get);

	return {
		visitorBlacklist: data?.data as VisitorBlacklistItemProps[],
		visitorBlacklist_loading: !data && !error,
		visitorBlacklist_error: error,
		reloadVisitorBlacklist: () => mutate(`${config.project.api.base_path}/get_visitor_blacklist`),
		createVisitorBlacklist: (data: VisitorBlacklistItemProps) => post(`${config.project.api.base_path}/create_visitor_blacklist`, data),
		updateVisitorBlacklist: (data: VisitorBlacklistItemProps) => post(`${config.project.api.base_path}/update_visitor_blacklist`, data),
		toggleVisitorBlacklist: (data: number[]) => post(`${config.project.api.base_path}/toggle_visitor_blacklist`, data),
		deleteVisitorBlacklist: (data: number[]) => post(`${config.project.api.base_path}/delete_visitor_blacklist`, data),
		checkVisitorBlacklistDuplicatesName: (id: number, value: string) => checkDuplicates(data?.data, id, 'visitor_name', value),
		checkVisitorBlacklistDuplicatesIp: (id: number, value: string) => checkDuplicates(data?.data, id, 'visitor_ip', value),
	};
};

export default useVisitorBlacklist;