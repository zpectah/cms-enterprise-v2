import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { settingsProps } from '../../types/app';
import useToasts from '../../hooks/useToasts';
import useSettings from '../../hooks/useSettings';
import PageHeading from '../../component/PageHeading';
import SettingsForm from './SettingsForm';
import useProfile from '../../hooks/useProfile';

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
	const { available_actions } = useProfile();

	const submitHandler = (master: settingsProps) => {
		return updateSettings(master).then((resp) => {
			createSuccessToast({ title: t('messages:model.data_updated') });
			reloadSettings();

			return resp;
		});
	};
	const afterLanguageInstallHandler = () => {
		reloadSettings();
	};

	useEffect(() => {
		if (settings_error) createErrorToast({ title: settings_error });
	}, [ settings_error ]);

	return (
		<>
			{available_actions.settings.view ? (
				<>
					<PageHeading
						title={t(`pages:settings.page_title`)}
					/>
					<SettingsForm
						data={settings}
						onSubmit={submitHandler}
						loading={settings_loading}
						afterLanguageInstall={afterLanguageInstallHandler}
					/>
				</>
			) : (
				<>
					{t('messages:profile.user_missing_permission')}
				</>
			)}
		</>
	);
};

export default SettingsModule;