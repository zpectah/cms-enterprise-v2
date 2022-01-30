import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Dialog } from '../../component/ui';

interface DashboardModuleProps {}

const DashboardModule = (props: DashboardModuleProps) => {
	const {} = props;
	const { t } = useTranslation();
	const [ confirmOpen, setConfirmOpen ] = useState<boolean>(false);

	return (
		<>
			<div>DashboardModule</div>
			<div>
				<button onClick={() => setConfirmOpen(true)}>{t('btn.open')}</button>
			</div>
			<Dialog.Confirm
				confirmData={[]}
				onConfirm={() => { console.log('trigger the confirm event') }}
				onClose={() => {
					setConfirmOpen(false);
				}}
				isOpen={confirmOpen}
			/>
		</>
	);
};

export default DashboardModule;
