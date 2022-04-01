import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Stack } from '@mui/material';

import PageHeading from '../../component/PageHeading';
import {
	ConfirmDialog,
	Button,
	PrimaryButton,
	SecondaryButton,
} from '../../component/ui';
import useToasts from '../../hooks/useToasts';
import useProfile from '../../hooks/useProfile';

const DashboardModule = () => {
	const { t } = useTranslation([ 'pages', 'messages' ]);
	const [ confirmOpen, setConfirmOpen ] = useState<boolean>(false);
	const { createToast, createSuccessToast } = useToasts();
	const navigate = useNavigate();
	const { available_actions } = useProfile();

	useEffect(() => {
		if (window.location.hash) {
			if (window.location.hash === '#loginSuccess') {
				createSuccessToast({
					title: t('messages:profile.user_login_success'),
				});
				navigate(`/admin/app`);
			}
		}
	}, [ window.location.hash ]);

	return (
		<>
			<PageHeading
				title={t(`pages:dashboard.page_title`)}
			/>
			<div>
				DashboardModule
				<br />
				<pre>
					<code>
						{JSON.stringify(available_actions, null, 2)}
					</code>
				</pre>
			</div>
			<Stack direction="row" spacing={2}>
				<Button onClick={() => setConfirmOpen(true)}>{t('btn.open')}</Button>
				<PrimaryButton>Primary</PrimaryButton>
				<SecondaryButton
					onClick={() => {
						createToast({
							title: 'Created toast item ...',
						});
					}}
				>Create toast</SecondaryButton>
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
