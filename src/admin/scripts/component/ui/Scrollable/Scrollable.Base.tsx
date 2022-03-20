import React from 'react';
import styled from '@emotion/styled';

import { getTestDataAttr } from '../../../utils';

const Wrapper = styled.div`
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
	overflow: hidden;
`;
const WrapperScrollable = styled.div`
	width: calc(100% + 25px);
	height: 100%;
	position: relative;
	overflow-x: hidden;
	overflow-y: auto;
`;
const WrapperContent = styled.div`
	width: calc(100% - 25px);
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
`;

export interface ScrollableBaseProps {
	dataId?: string;
}

const ScrollableBase: React.FC<ScrollableBaseProps> = (props) => {
	const {
		children,
		dataId = 'scrollable-base',
	} = props;

	return (
		<Wrapper {...getTestDataAttr(dataId)}>
			<WrapperScrollable>
				<WrapperContent>{children}</WrapperContent>
			</WrapperScrollable>
		</Wrapper>
	);
};

export default ScrollableBase;