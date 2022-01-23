import React from 'react';
import { useTranslation } from 'react-i18next';

interface DashboardModuleProps {}

const DashboardModule = (props: DashboardModuleProps) => {
	const {} = props;
	const { t } = useTranslation();

	return (
		<>
			<div>DashboardModule</div>
			<div>
				<button>
					{t('btn.open')}
				</button>
			</div>
		</>
	);
};

export default DashboardModule;