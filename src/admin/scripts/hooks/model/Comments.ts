import useSWR, { mutate } from 'swr';

import config from '../../config';
import { get, post } from '../../utils';
import { CommentsItemProps } from '../../types/model';

const useComments = () => {
	const { data, error } = useSWR(`${config.project.api.base_path}/get_comments`, get);

	return {
		comments: data?.data as CommentsItemProps[],
		comments_loading: !data && !error,
		comments_error: error,
		reloadComments: () => mutate(`${config.project.api.base_path}/get_comments`),
		createComments: (data: CommentsItemProps) => post(`${config.project.api.base_path}/create_comments`, data),
		updateComments: (data: CommentsItemProps) => post(`${config.project.api.base_path}/update_comments`, data),
		toggleComments: (data: number[]) => post(`${config.project.api.base_path}/toggle_comments`, data),
		deleteComments: (data: number[]) => post(`${config.project.api.base_path}/delete_comments`, data),
		confirmComments: (data: number[]) => post(`${config.project.api.base_path}/confirm_comments`, data),
		reportComments: (data: number[]) => post(`${config.project.api.base_path}/report_comments`, data),
		commentsWithChildrenAndProps: (
			assigned: 'Posts' | 'Categories',
			assigned_id: number,
		) => get(`${config.project.api.base_path}/get_comments?with_children=true&assigned=${assigned}&assigned_id=${assigned_id}`),
	};
};

export default useComments;
