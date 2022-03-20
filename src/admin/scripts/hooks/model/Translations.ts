import useSWR, { mutate } from 'swr';

import config from '../../config';
import { get, post, checkDuplicates } from '../../utils';
import { TranslationsItemProps } from '../../types/model';

const useTranslations = () => {
	const { data, error } = useSWR(`${config.project.api.base_path}/get_translations`, get);

	return {
		translations: data?.data as TranslationsItemProps[],
		translations_loading: !data && !error,
		translations_error: error,
		reloadTranslations: () => mutate(`${config.project.api.base_path}/get_translations`),
		createTranslations: (data: TranslationsItemProps) => post(`${config.project.api.base_path}/create_translations`, data),
		updateTranslations: (data: TranslationsItemProps) => post(`${config.project.api.base_path}/update_translations`, data),
		toggleTranslations: (data: number[]) => post(`${config.project.api.base_path}/toggle_translations`, data),
		deleteTranslations: (data: number[]) => post(`${config.project.api.base_path}/delete_translations`, data),
		checkTranslationsDuplicates: (id: number, value: string) => checkDuplicates(data?.data, id, 'name', value),
	};
};

export default useTranslations;
