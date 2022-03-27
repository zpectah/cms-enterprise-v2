import React from 'react';
import { Routes, Route } from 'react-router-dom';
import {
	Paper,
	Typography,
} from '@mui/material';

import config from '../../config';
import LostPasswordForm from './LostPasswordForm';
import CreateNewPasswordForm from './CreateNewPasswordForm';

interface LostPasswordModuleProps {}

const LostPasswordModule = (props: LostPasswordModuleProps) => {
	const {} = props;

	return (
		<Paper
			sx={{
				p: 3,
				display: 'flex',
				flexDirection: 'column',
				width: {
					xs: '80vw',
					md: '400px',
				},
			}}
		>
			<Routes>
				<Route index element={<LostPasswordForm />} />
				<Route path="token/:token" element={<CreateNewPasswordForm />} />
			</Routes>
			<Typography
				variant="caption"
				sx={{
					pt: 3.5,
					display: 'block',
					textAlign: 'center',
					opacity: .5,
				}}
			>
				{config.project.meta.name}&nbsp;v{config.project.meta.version}
			</Typography>
		</Paper>
	);
};

export default LostPasswordModule;
