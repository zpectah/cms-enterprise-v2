import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Stack } from '@mui/material';

import PageHeading from '../../component/PageHeading';
import {
	ConfirmDialog,
	Button,
	PrimaryButton,
	SecondaryButton,
} from '../../component/ui';

const DashboardModule = () => {
	const { t } = useTranslation(['pages']);
	const [ confirmOpen, setConfirmOpen ] = useState<boolean>(false);

	return (
		<>
			<PageHeading
				title={t(`pages:dashboard.page_title`)}
			/>
			<div>DashboardModule</div>
			<Stack direction="row" spacing={2}>
				<Button onClick={() => setConfirmOpen(true)}>{t('btn.open')}</Button>
				<PrimaryButton>Primary</PrimaryButton>
				<SecondaryButton>Secondary</SecondaryButton>
			</Stack>
			<ConfirmDialog
				confirmData={[]}
				onConfirm={() => { console.log('trigger the confirm event') }}
				onClose={() => {
					setConfirmOpen(false);
				}}
				open={confirmOpen}
			/>
		</>
	);
};

export default DashboardModule;
