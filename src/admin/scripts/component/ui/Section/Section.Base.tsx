import React from 'react';
import {
	Typography,
	TypographyProps,
	GlobalStylesProps,
} from '@mui/material';
import { styled, Divider } from '@mui/material';

import getTestDataAttr from '../../../utils/getTestDataAttr';

const Wrapper = styled('section')`
	width: 100%;
	height: auto;
	flex-direction: column;
`;
const Content = styled('div')`
	width: 100%;
`;

export interface SectionBaseProps extends React.HTMLProps<HTMLElement>, React.HTMLAttributes<HTMLElement> {
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
		style,
	} = props;

	return (
		<Wrapper
			style={{
				marginBottom: noSpacing ? '0' : '2.5rem',
				display: !invisible ? 'flex' : 'none',
				...style,
			}}
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
			<Content
				style={{
					paddingBottom: divider ? '1.5rem' : '0',
				}}
			>
				{children}
			</Content>
			{divider && <Divider />}
		</Wrapper>
	);
};

export default SectionBase;