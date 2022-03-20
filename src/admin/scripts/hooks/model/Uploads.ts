import useSWR, { mutate } from 'swr';

import config from '../../config';
import { get, post, checkDuplicates } from '../../utils';
import { UploadsItemProps } from '../../types/model';

const useUploads = () => {
	const { data, error } = useSWR(`${config.project.api.base_path}/get_uploads`, get);

	return {
		uploads: data?.data as UploadsItemProps[],
		uploads_loading: !data && !error,
		uploads_error: error,
		reloadUploads: () => mutate(`${config.project.api.base_path}/get_uploads`),
		createUploads: (data: UploadsItemProps) => post(`${config.project.api.base_path}/create_uploads`, data),
		updateUploads: (data: UploadsItemProps) => post(`${config.project.api.base_path}/update_uploads`, data),
		toggleUploads: (data: number[]) => post(`${config.project.api.base_path}/toggle_uploads`, data),
		deleteUploads: (data: number[]) => post(`${config.project.api.base_path}/delete_uploads`, data),
		checkUploadsDuplicates: (id: number, value: string) => checkDuplicates(data?.data, id, 'name', value),
	};
};

export default useUploads;
