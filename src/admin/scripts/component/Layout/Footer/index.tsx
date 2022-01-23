import React from 'react';
import styled from '@emotion/styled';

import { FOOTER_MIN_HEIGHT } from '../../../styles/variables';

interface FooterProps {}

const Wrapper = styled('footer')`
	width: 100%;
	height: auto;
	min-height: ${FOOTER_MIN_HEIGHT};
`;

const Footer = (props: FooterProps) => {
	const {} = props;

	return (
		<>
			<Wrapper>footer</Wrapper>
		</>
	);
};

export default Footer;