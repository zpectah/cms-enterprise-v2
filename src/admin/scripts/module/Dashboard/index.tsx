import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Dialog, Button } from '../../component/ui';

interface DashboardModuleProps {}

const DashboardModule = (props: DashboardModuleProps) => {
	const {} = props;
	const { t } = useTranslation();
	const [ confirmOpen, setConfirmOpen ] = useState<boolean>(false);

	return (
		<>
			<div>DashboardModule</div>
			<div>
				<Button.Default onClick={() => setConfirmOpen(true)}>{t('btn.open')}</Button.Default>
			</div>
			<div>
				<Button.Primary>Primary</Button.Primary>
				<Button.Secondary>Secondary</Button.Secondary>
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
