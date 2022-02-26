import React, { useCallback } from 'react';
import { default as MuiBreadcrumbs } from '@mui/material/Breadcrumbs';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import useBreadcrumbs from '../../../hooks/useBreadcrumbs';

const Breadcrumbs = () => {
	const { t } = useTranslation([ 'pages', 'components' ]);
	const {
		cms,
		app,
		page,
		panel,
		detail,
		location,
	} = useBreadcrumbs();

	const getBreadcrumbs = useCallback(() => {
		const fields = [
			{
				key: 0,
				label: cms,
			},
		];
		if (app) fields.push({
			key: 1,
			label: app,
		});
		if (page) fields.push({
			key: 2,
			label: t(`pages:${page}.label`),
		});
		if (panel) {
			let label = panel;
			if (page === 'settings') label = t(`components:SettingsForm.panel.${panel}`);
			fields.push({
				key: 3,
				label: label,
			});
		}
		if (detail) fields.push({
			key: 4,
			label: `#${detail}`,
		});

		return fields;
	},[ location ]);

	return (
		<Box sx={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
			<MuiBreadcrumbs sx={{ fontSize: '.75rem' }}>
				{getBreadcrumbs().map((item) => {
					const {
						key,
						label,
					} = item;

					 return (
						<Typography
							key={key}
							variant="caption"
						>
							{label}
						</Typography>
					);
				})}
			</MuiBreadcrumbs>
		</Box>
	);
};

export default Breadcrumbs;