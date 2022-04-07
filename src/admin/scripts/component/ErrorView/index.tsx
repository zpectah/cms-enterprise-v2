import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Box, Stack, Typography } from '@mui/material';

import useProfile from '../../hooks/useProfile';
import { Button } from '../ui';

export interface ErrorViewProps {
	type: 404 | 'boundary';
	boundaryError?: any;
}

const ErrorView = (props: ErrorViewProps) => {
	const {
		type,
		boundaryError,
	} = props;

	const { t } = useTranslation([ 'components' ]);
	const navigate = useNavigate();
	const { profile } = useProfile();
	const linkText = t(`components:ErrorView.btn.${profile ? 'dashboard' : 'login'}`);

	const returnLinkHandler = () => {
		let path = '/admin/app/login';
		if (profile) {
			path = '/admin/app';
		}
		if (type !== 'boundary') {
			navigate(path);
		} else {
			window.location.href = path;
		}
	};

	const renderButton = useMemo(() => {
		return (
			<Button
				onClick={returnLinkHandler}
				variant="outlined"
			>
				{linkText}
			</Button>
		);
	}, []);
	const renderView = useMemo(() => {
		switch (type) {
			case 404:
				return (
					<>
						<Typography
							variant="h1"
							sx={{
								fontSize: '7.5rem',
							}}
						>
							404
						</Typography>
						<Typography>
							{t('components:ErrorView.404.description')}
						</Typography>
						{renderButton}
					</>
				);

			case 'boundary':
				return (
					<>
						<Typography
							variant="h2"
						>
							{t('components:ErrorView.boundary.title')}
						</Typography>
						<Typography>
							{t('components:ErrorView.boundary.description')}
						</Typography>
						{renderButton}
						<Box
							sx={{
								width: '100%',
								mt: 2,
							}}
						>
							<small>
								<pre>
									<code>
										{String(boundaryError)}
									</code>
								</pre>
							</small>
						</Box>
					</>
				);

			default:
				return (<>Error is not defined</>);
		}
	}, [ type ]);
	
	return (
		<Box>
			<Stack
				spacing={2}
				alignItems="center"
				justifyContent="center"
			>
				{renderView}
			</Stack>
		</Box>
	);
};

export default ErrorView;
