import React from 'react';
import { Stack, Typography } from '@mui/material';
import styled from '@emotion/styled';

import config from '../../../config';
import { FOOTER_MIN_HEIGHT } from '../../../styles/variables';

interface FooterProps {}

const Wrapper = styled('footer')`
	width: 100%;
	height: auto;
	min-height: ${FOOTER_MIN_HEIGHT};
	
	& span{
		opacity: .5;
	}
`;

const Footer = (props: FooterProps) => {
	const {} = props;

	return (
		<>
			<Wrapper>
				<Stack direction="row" spacing={2}>
					<Typography variant="caption">
						&copy;&nbsp;
						{config.project.meta.copyright_year}&nbsp;
						{config.project.meta.name}
					</Typography>
				</Stack>
			</Wrapper>
		</>
	);
};

export default Footer;
