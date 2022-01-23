import React from 'react';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import Container from '@mui/material/Container';
import styled from '@emotion/styled';

import { pageLayoutProps } from '../../types/page';
import { appStoreProps } from '../../types/store';
import { HEADER_HEIGHT, SIDEBAR_MOBILE_WIDTH, SIDEBAR_DESKTOP_WIDTH } from '../../styles/variables';
import { LayoutWrapper, LayoutContent } from '../../styles/mixins';
import media from '../../styles/responsive';
import Footer from './Footer';
import Sidebar from './Sidebar';
import Header from './Header';

interface AppLayoutProps extends pageLayoutProps {}

const WrapperInner = styled('div')`
	width: ${SIDEBAR_MOBILE_WIDTH};
	height: calc(100% - ${HEADER_HEIGHT});
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	position: absolute;
	top: ${HEADER_HEIGHT};
	left: 0;
	transition: width .125s ease-in-out 0s, left .125s ease-in-out 0s;
	
	${media.min.md} {
		width: ${(props: { isOpen?: boolean }) => props.isOpen ? `calc(100% - ${SIDEBAR_DESKTOP_WIDTH})` : '100%'};
		left: ${(props: { isOpen?: boolean }) => props.isOpen ? SIDEBAR_DESKTOP_WIDTH : '0'};		
	}
`;
const StyledContainer = styled(Container)`
	height: 100%;
	display: flex;
	flex-direction: column;
`;

const AppLayout: React.FC<AppLayoutProps> = (props) => {
	const { children, meta, containerMaxWidth = 'lg', withFooter = true } = props;
	const { sidebarOpen } = useSelector((store: appStoreProps) => store);

	return (
		<>
			<Helmet>
				<title>{meta.title}</title>
			</Helmet>
			<LayoutWrapper>
				<WrapperInner isOpen={sidebarOpen}>
					<StyledContainer maxWidth={containerMaxWidth}>
						<LayoutContent>{children}</LayoutContent>
						{withFooter && <Footer />}
					</StyledContainer>
				</WrapperInner>
				<Sidebar />
				<Header />
			</LayoutWrapper>
		</>
	);
};

export default AppLayout;
