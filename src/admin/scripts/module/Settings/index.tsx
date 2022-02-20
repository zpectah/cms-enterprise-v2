import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import PageHeading from '../../component/PageHeading';
import SettingsForm from './SettingsForm';

const SettingsModule = () => {
	const { t } = useTranslation(['pages']);

	return (
		<>
			<PageHeading
				title={t(`pages:settings.page_title`)}
			/>
			<SettingsForm />
		</>
	);
};

export default SettingsModule;