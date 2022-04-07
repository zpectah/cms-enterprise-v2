import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Grid, Box, Alert } from '@mui/material';

import PageHeading from '../../component/PageHeading';
import useToasts from '../../hooks/useToasts';
import useSettings from '../../hooks/useSettings';
// import useProfile from '../../hooks/useProfile';
// import TileBase from './tiles/TileBase';
import WelcomeTile from './tiles/WelcomeTile';

const DashboardModule = () => {
	const { t } = useTranslation([ 'pages', 'messages' ]);
	const { createSuccessToast } = useToasts();
	const navigate = useNavigate();
	const { settingsError } = useSettings();
	// const { available_actions } = useProfile();

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
			{settingsError?.length > 0 && (
				<Box
					sx={{
						width: '100%',
						mb: 2,
					}}
				>
					{settingsError?.list.map((error) => (
						<Alert
							key={error}
							severity="error"
							sx={{ mb: 1 }}
						>
							{error}
						</Alert>
					))}
				</Box>
			)}
			<Box
				sx={{
					width: '100%',
				}}
			>
				<Grid
					container
					spacing={2}
				>

					<WelcomeTile
						grid={{
							xs: 12,
							sm: 8,
						}}
					/>

				</Grid>
			</Box>
		</>
	);
};

export default DashboardModule;
