import React from 'react';
import { default as MuiBreadcrumbs } from '@mui/material/Breadcrumbs';
import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

import config from '../../../config';

interface BreadcrumbsProps {}

const Breadcrumbs = (props: BreadcrumbsProps) => {
	const {} = props;
	const params = useParams();

	console.log('params', params);

	const breadcrumbItems = [
		{
			key: 0,
			label: 'lang',
			active: true,
		},
		{
			key: 1,
			label: config.project.meta.name,
			active: true,
		},
		{
			key: 2,
			label: 'app',
			active: true,
		},
		{
			key: 3,
			label: 'page',
			active: true,
		},
		{
			key: 4,
			label: 'detail or panel',
			active: params.id || params.panel,
		},
		{
			key: 5,
			label: 'id',
			active: params.id,
		}
	];

	return (
		<Box sx={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
			<MuiBreadcrumbs sx={{ fontSize: '.75rem' }}>
				{breadcrumbItems.map((item) => {
					const {
						key,
						label,
						active,
					} = item;

					if (active) return (
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