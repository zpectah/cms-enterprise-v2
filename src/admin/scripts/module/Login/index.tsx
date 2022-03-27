import React from 'react';
import {
	Paper,
	Typography,
} from '@mui/material';

import config from '../../config';
import useProfile from '../../hooks/useProfile';
import LoginForm from './LoginForm';

interface LoginModuleProps {}

const LoginModule = (props: LoginModuleProps) => {
	const {} = props;

	const {
		profile,
		userLogin,
	} = useProfile();

	const submitHandler = (master) => {
		return userLogin(master).then((resp) => resp);
	};

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
			<LoginForm
				onSubmit={submitHandler}
			/>
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

export default LoginModule;
