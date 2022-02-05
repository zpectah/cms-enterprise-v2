import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';

import { appStoreProps } from '../../../types/store';
import {
	HEADER_HEIGHT,
	SIDEBAR_MOBILE_WIDTH,
	SIDEBAR_DESKTOP_WIDTH,
} from '../../../styles/variables';
import media from '../../../styles/responsive';
import { Scrollable } from '../../ui';
import Navbar from '../Navbar';
import { sidebarToggle } from '../../../store/actions';

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
	left: ${(props: { isOpen?: boolean }) =>
		props.isOpen ? '0' : `-${SIDEBAR_MOBILE_WIDTH}`};
	transition: width 0.125s ease-in-out 0s, left 0.125s ease-in-out 0s;

	background-color: rgba(225,225,225, 1);
	border-right: 1px solid rgba(175,175,175, 0.25);

	${media.min.md} {
		width: ${SIDEBAR_DESKTOP_WIDTH};
		left: ${(props: { isOpen?: boolean }) =>
			props.isOpen ? '0' : `-${SIDEBAR_DESKTOP_WIDTH}`};
		background-color: rgba(225,225,225, 0.125);			
	}
`;

const Sidebar = (props: SidebarProps) => {
	const {} = props;
	const { sidebarOpen } = useSelector((store: appStoreProps) => store);
	const dispatch = useDispatch();

	return (
		<Wrapper isOpen={sidebarOpen}>
			<Scrollable>
				<Navbar onSidebarClose={() => dispatch(sidebarToggle(!sidebarOpen))} />
			</Scrollable>
		</Wrapper>
	);
};

export default Sidebar;
