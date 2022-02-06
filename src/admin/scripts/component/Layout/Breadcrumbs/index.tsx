import React, { useCallback } from 'react';
import { default as MuiBreadcrumbs } from '@mui/material/Breadcrumbs';
import { Box, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';

import config from '../../../config';

const Breadcrumbs = () => {
	const location = useLocation();
	const getBreadcrumbs = useCallback(() => {
		const parsedPath = location.pathname.split('/');
		const fields = [
			{
				key: 0,
				label: config.project.meta.name,
			},
		];

		// App
		if (parsedPath[2]) fields.push({
			key: 1,
			label: parsedPath[2],
		});

		// Page
		if (parsedPath[3]) fields.push({
			key: 2,
			label: parsedPath[3],
		});

		// Panel or Detail
		if (parsedPath[4] && parsedPath[5]) {
			fields.push({
				key: 3,
				label: parsedPath[4],
			});
			fields.push({
				key: 4,
				label: `#${parsedPath[5]}`,
			});
		}

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