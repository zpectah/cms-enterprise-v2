import React from 'react';
import Typography, { TypographyProps } from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import styled from '@emotion/styled';

import getTestDataAttr from '../../../utils/getTestDataAttr';

const Wrapper = styled.section<{ visible: boolean; noSpacing: boolean }>`
	width: 100%;
	height: auto;
	margin-bottom: ${(props) => (props.noSpacing ? '0' : '2.5rem')};
	display: ${(props) => (props.visible ? 'flex' : 'none')};
	flex-direction: column;
`;
const Content = styled.div`
	width: 100%;
`;

export interface SectionBaseProps {
	dataId?: string;
	title?: string;
	subtitle?: string;
	invisible?: boolean;
	noSpacing?: boolean;
	titleVariant?: TypographyProps['variant'];
	divider?: boolean;
}

const SectionBase: React.FC<SectionBaseProps> = (props) => {
	const {
		children,
		dataId = 'section-base',
		title,
		subtitle,
		invisible,
		noSpacing,
		titleVariant = 'h3',
		divider,
	} = props;

	return (
		<Wrapper
			visible={!invisible}
			noSpacing={noSpacing}
			{...getTestDataAttr(dataId)}
		>
			{title && (
				<Typography
					variant={titleVariant}
					component="div"
					sx={{
						mb: subtitle ? 2 : 3,
					}}
				>
					{title}
				</Typography>
			)}
			{subtitle && (
				<Typography
					variant="subtitle1"
					component="div"
					sx={{
						mb: 3,
					}}
				>
					{subtitle}
				</Typography>
			)}
			<Content>{children}</Content>
			{divider && <Divider />}
		</Wrapper>
	);
};

export default SectionBase;