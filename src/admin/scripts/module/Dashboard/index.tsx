import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Stack } from '@mui/material';

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
