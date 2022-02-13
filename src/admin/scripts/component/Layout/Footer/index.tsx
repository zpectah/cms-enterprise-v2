import React from 'react';
import { styled, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import config from '../../../config';
import { FOOTER_MIN_HEIGHT } from '../../../styles/variables';

interface FooterProps {}

const Wrapper = styled('footer')`
	width: 100%;
	height: auto;
	min-height: ${FOOTER_MIN_HEIGHT};
	margin-top: 2.5rem;
	display: flex;
	align-items: center;
	
	& span{
		opacity: .5;
	}
`;

const Footer = (props: FooterProps) => {
	const { t } = useTranslation('common');
	const {} = props;

	return (
		<>
			<Wrapper>
				<Stack
					direction="row"
					spacing={2}
				>
					<Typography variant="caption">
						&copy;&nbsp;
						{config.project.meta.copyright_year}&nbsp;
						{config.project.meta.name}&nbsp;v{config.project.meta.version}
						&nbsp;|&nbsp;{t('common.allRightsReserved')}
					</Typography>
				</Stack>
			</Wrapper>
		</>
	);
};

export default Footer;
