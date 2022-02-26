import useSWR, { mutate } from 'swr';

import config from '../../config';
import { get, post } from '../../utils/api';
import { TranslationsItemProps } from '../../types/model';

const useTranslations = () => {
	const { data, error } = useSWR(`${config.project.api.base_path}/get_translations`, get);

	return {};
};

export default useTranslations;
