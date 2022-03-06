import useSWR, { mutate } from 'swr';

import config from '../../config';
import { get, post } from '../../utils/api';
import { MessagesItemProps } from '../../types/model';

const useMessages = () => {
	const { data, error } = useSWR(`${config.project.api.base_path}/get_messages`, get);

	return {
		messages: data?.data as MessagesItemProps[],
		messages_loading: !data && !error,
		messages_error: error,
		reloadMessages: () => mutate(`${config.project.api.base_path}/get_messages`),
		createMessages: (data: MessagesItemProps) => post(`${config.project.api.base_path}/create_messages`, data),
		updateMessages: (data: MessagesItemProps) => post(`${config.project.api.base_path}/update_messages`, data),
		toggleMessages: (data: number[]) => post(`${config.project.api.base_path}/toggle_messages`, data),
		deleteMessages: (data: number[]) => post(`${config.project.api.base_path}/delete_messages`, data),
		markReadMessages: (data: number[]) => post(`${config.project.api.base_path}/mark_read_messages`, data),
	};
};

export default useMessages;
