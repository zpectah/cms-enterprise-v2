import React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled, Typography } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import { IconButton } from '../ui';

interface PageHeadingProps {
	title: string;
	returnTo?: string;
}

const Wrapper = styled('div')`
	width: 100%;
	margin-bottom: .5rem;
	padding: 1rem 0;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;
const TitleBlock = styled('div')`
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
	} = props;
	const navigate = useNavigate();

	const returnHandler = () => {
		navigate(returnTo);
	};

	return (
		<Wrapper>
			<TitleBlock>
				{returnTo && (
					<IconButton
						onClick={returnHandler}
						sx={{ marginRight: '.75rem' }}
					>
						<ArrowBackIosNewIcon />
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
		</Wrapper>
	);
};

export default PageHeading;
