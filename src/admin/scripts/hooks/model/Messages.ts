import useSWR, { mutate } from 'swr';

import config from '../../config';
import { get, post } from '../../utils/api';
import { MessagesItemProps } from '../../types/model';

const useMessages = () => {
	const { data, error } = useSWR(`${config.project.api.base_path}/get_messages`, get);

	return {};
};

export default useMessages;
