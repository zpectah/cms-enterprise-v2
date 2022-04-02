import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Grid, Box } from '@mui/material';

import PageHeading from '../../component/PageHeading';
import useToasts from '../../hooks/useToasts';
// import useProfile from '../../hooks/useProfile';
// import TileBase from './tiles/TileBase';
import WelcomeTile from './tiles/WelcomeTile';

const DashboardModule = () => {
	const { t } = useTranslation([ 'pages', 'messages' ]);
	const { createSuccessToast } = useToasts();
	const navigate = useNavigate();
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
