import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import PageHeading from '../../component/PageHeading';

const SettingsModule = () => {
	const { t } = useTranslation(['pages']);

	return (
		<>
			<PageHeading
				title={t(`pages:dashboard.page_title`)}
			/>
			<div>
				SettingsModule (tabs form)
			</div>
		</>
	);
};

export default SettingsModule;