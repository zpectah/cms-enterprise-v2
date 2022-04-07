import useSWR, { mutate } from 'swr';
import { useTranslation } from 'react-i18next';

import config from '../config';
import { get, post } from '../utils';
import { settingsProps } from '../types/app';

const getErrors = (model: settingsProps, t: any) => {
	const errors = {
		fields: {},
		length: 0,
		list: [],
	};
	if (model?.project_name === '') {
		errors.fields['project_name'] = t('messages:settings.project_name');
		errors.list.push(t('messages:settings.project_name'));
		errors.length = errors.length + 1;
	}
	if (model?.web_meta_title === '') {
		errors.fields['web_meta_title'] = t('messages:settings.web_meta_title');
		errors.list.push(t('messages:settings.web_meta_title'));
		errors.length = errors.length + 1;
	}
	if (model?.web_meta_description === '') {
		errors.fields['web_meta_description'] = t('messages:settings.web_meta_description');
		errors.list.push(t('messages:settings.web_meta_description'));
		errors.length = errors.length + 1;
	}
	if (model?.form_email_sender === '') {
		errors.fields['form_email_sender'] = t('messages:settings.form_email_sender');
		errors.list.push(t('messages:settings.form_email_sender'));
		errors.length = errors.length + 1;
	}
	if (model?.language_default === '') {
		errors.fields['language_default'] = t('messages:settings.language_default');
		errors.list.push(t('messages:settings.language_default'));
		errors.length = errors.length + 1;
	}
	if (model?.language_installed.length === 0) {
		errors.fields['language_installed'] = t('messages:settings.language_installed');
		errors.list.push(t('messages:settings.language_installed'));
		errors.length = errors.length + 1;
	}
	if (model?.language_active.length === 0) {
		errors.fields['language_active'] = t('messages:settings.language_active');
		errors.list.push(t('messages:settings.language_active'));
		errors.length = errors.length + 1;
	}

	return errors;
};

const useSettings = () => {
	const { data, error } = useSWR(`${config.project.api.base_path}/get_cms_settings`, get);
	const { t } = useTranslation([ 'messages' ]);
	const errors = getErrors(data?.data, t);

	return {
		settings: data?.data as settingsProps,
		settings_loading: !data && !error,
		settings_error: error,
		reloadSettings: () => mutate(`${config.project.api.base_path}/get_cms_settings`),
		updateSettings: (data: settingsProps) => post(`${config.project.api.base_path}/update_cms_settings`, data),
		settingsError: errors,
	};
};

export default useSettings;
