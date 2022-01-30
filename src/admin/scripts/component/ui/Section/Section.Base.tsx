import React from 'react';
import Typography, { TypographyProps } from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import styled from '@emotion/styled';

import getTestDataAttr from '../../../utils/getTestDataAttr';

const Wrapper = styled.section<{ visible: boolean; noSpacing: boolean }>`
	width: 100%;
	height: auto;
	margin-bottom: ${(props) => (props.noSpacing ? '0' : '1rem')};
	display: ${(props) => (props.visible ? 'flex' : 'none')};
	flex-direction: column;
`;
const Content = styled.div`
	width: 100%;
`;

interface SectionBaseProps {
	dataId?: string;
	title?: string;
	subtitle?: string;
	visible?: boolean;
	noSpacing?: boolean;
	titleVariant?: TypographyProps['variant'];
	bottomDivider?: boolean;
}

const SectionBase: React.FC<SectionBaseProps> = (props) => {
	const {
		children,
		dataId = 'section-base',
		title,
		subtitle,
		visible,
		noSpacing,
		titleVariant = 'h3',
		bottomDivider,
	} = props;

	return (
		<Wrapper
			visible={visible}
			noSpacing={noSpacing}
			{...getTestDataAttr(dataId)}
		>
			{title && (
				<Typography variant={titleVariant} component="div" gutterBottom>
					{title}
				</Typography>
			)}
			{subtitle && (
				<Typography variant="subtitle1" component="div" gutterBottom>
					{subtitle}
				</Typography>
			)}
			<Content>{children}</Content>
			{bottomDivider && <Divider />}
		</Wrapper>
	);
};

export default SectionBase;