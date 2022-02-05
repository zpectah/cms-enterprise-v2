import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
	ConfirmDialog,
	Button,
	PrimaryButton,
	SecondaryButton
} from '../../component/ui';

interface DashboardModuleProps {}

const DashboardModule = (props: DashboardModuleProps) => {
	const {} = props;
	const { t } = useTranslation();
	const [ confirmOpen, setConfirmOpen ] = useState<boolean>(false);

	return (
		<>
			<div>DashboardModule</div>
			<div>
				<Button onClick={() => setConfirmOpen(true)}>{t('btn.open')}</Button>
			</div>
			<div>
				<PrimaryButton>Primary</PrimaryButton>
				<SecondaryButton>Secondary</SecondaryButton>
			</div>
			<ConfirmDialog
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
