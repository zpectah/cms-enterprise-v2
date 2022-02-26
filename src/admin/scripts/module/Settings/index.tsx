import React, { useEffect } from 'react';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';

import { settingsProps } from '../../types/app';
import useToasts from '../../hooks/useToasts';
import useSettings from '../../hooks/useSettings';
import PageHeading from '../../component/PageHeading';
import SettingsForm from './SettingsForm';

const SettingsModule = () => {
	const { t } = useTranslation([ 'pages', 'messages' ]);
	const {
		settings,
		settings_loading,
		settings_error,
		reloadSettings,
		updateSettings,
	} = useSettings();
	const {
		createSuccessToast,
		createErrorToast,
	} = useToasts();

	const submitHandler = (master: settingsProps) => {
		return updateSettings(master).then((resp) => {
			createSuccessToast({ title: t('messages:model.data_updated') });
			reloadSettings();

			return resp;
		});
	};

	useEffect(() => {
		if (settings_error) createErrorToast({ title: settings_error });
	}, [ settings_error ]);

	return (
		<>
			<PageHeading
				title={t(`pages:settings.page_title`)}
			/>
			<SettingsForm
				data={settings}
				onSubmit={submitHandler}
				loading={settings_loading}
			/>
		</>
	);
};

export default SettingsModule;