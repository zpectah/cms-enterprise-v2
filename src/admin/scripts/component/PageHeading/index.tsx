import React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { IconButton } from '../ui';
import AddMenuButton from '../AddMenuButton';

interface PageHeadingProps {
	title: string;
	returnTo?: string;
	createButtonLabel?: string;
	createButtonPath?: string;
}

const Wrapper = styled('div')`
	width: 100%;
	margin-bottom: 2.5rem;
	padding: .75rem 0;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;
const TitleBlock = styled('div')`
	min-height: 40px;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;
const RestBlock = styled('div')``;

const PageHeading: React.FC<PageHeadingProps> = (props) => {
	const {
		children,
		title,
		returnTo,
		createButtonLabel,
		createButtonPath,
	} = props;

	const navigate = useNavigate();

	return (
		<Wrapper>
			<TitleBlock>
				{returnTo && (
					<IconButton
						onClick={() => navigate(returnTo)}
						sx={{ marginRight: '.75rem' }}
					>
						<ArrowBackIcon fontSize="small" />
					</IconButton>
				)}
				<Typography
					variant="h1"
				>
					{title}
				</Typography>
			</TitleBlock>
			{children && (
				<RestBlock>
					{children}
				</RestBlock>
			)}
			{(createButtonLabel && createButtonPath) && (
				<RestBlock>
					<AddMenuButton
						addLabel={createButtonLabel}
						addCallback={() => navigate(createButtonPath)}
					/>
				</RestBlock>
			)}
		</Wrapper>
	);
};

export default PageHeading;
