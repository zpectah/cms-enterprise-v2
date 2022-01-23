import React from 'react';
import { Helmet } from 'react-helmet';
import Container from '@mui/material/Container';
import styled from '@emotion/styled';

import { pageLayoutProps } from '../../types/page';
import { LayoutWrapper, LayoutContent } from '../../styles/mixins';
import Footer from './Footer';

interface MinimalLayoutProps extends pageLayoutProps {
	withOptions?: boolean;
}

const FloatingBlock = styled('div')`
	width: 60px;
	height: 60px;
	display: block;
	position: absolute;
	top: 1rem;
	right: 1rem;
`;

const MinimalLayout: React.FC<MinimalLayoutProps> = (props) => {
	const { children, meta, containerMaxWidth = 'lg', withFooter = false, withOptions = false } = props;

	return (
		<>
			<Helmet>
				<title>{meta.title}</title>
			</Helmet>
			<LayoutWrapper>
				<Container maxWidth={containerMaxWidth}>
					<LayoutContent>{children}</LayoutContent>
					{withFooter && <Footer />}
				</Container>
				{withOptions && <FloatingBlock>floating options button</FloatingBlock>}
			</LayoutWrapper>
		</>
	);
};

export default MinimalLayout;
