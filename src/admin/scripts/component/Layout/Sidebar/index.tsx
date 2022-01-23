import React from 'react';
import { useSelector } from 'react-redux';
import styled from '@emotion/styled';

import { appStoreProps } from '../../../types/store';
import { HEADER_HEIGHT, SIDEBAR_MOBILE_WIDTH, SIDEBAR_DESKTOP_WIDTH } from '../../../styles/variables';
import media from '../../../styles/responsive';

interface SidebarProps {}

const Wrapper = styled('aside')`
	width: 100%;
	height: calc(100vh - ${HEADER_HEIGHT});
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	position: absolute;
	top: ${HEADER_HEIGHT};
	left: ${(props: { isOpen?: boolean }) => props.isOpen ? '0' : `-${SIDEBAR_MOBILE_WIDTH}`};
	transition: width .125s ease-in-out 0s, left .125s ease-in-out 0s;
		
	background-color: rgba(125,125,125,.25);	
	
	${media.min.md} {
		width: ${SIDEBAR_DESKTOP_WIDTH};	
		left: ${(props: { isOpen?: boolean }) => props.isOpen ? '0' : `-${SIDEBAR_DESKTOP_WIDTH}`};
	}
`;

const Sidebar = (props: SidebarProps) => {
	const {} = props;
	const { sidebarOpen } = useSelector((store: appStoreProps) => store);

	return (
		<>
			<Wrapper isOpen={sidebarOpen}>sidebar {sidebarOpen ? 'open' : 'closed'}</Wrapper>
		</>
	);
};

export default Sidebar;