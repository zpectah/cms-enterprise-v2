import React from 'react';
import {
	Grid,
	Card,
	Box,
	Stack,
	Divider,
	GridProps,
	SxProps,
} from '@mui/material';

import { CardHeading } from '../../../component/ui';

export interface TileBaseProps {
	title?: string;
	subheader?: string;
	headingNode?: React.ReactNode;
	footerNode?: React.ReactNode;
	grid?: GridProps;
	sx?: SxProps;
	contentSx?: SxProps;
	headingSx?: SxProps;
	footerSx?: SxProps;
	dividers?: boolean;
}

const TileBase: React.FC<TileBaseProps> = (props) => {
	const {
		children,
		title,
		subheader,
		headingNode,
		footerNode,
		grid,
		sx,
		contentSx,
		headingSx,
		footerSx,
		dividers,
	} = props;

	return (
		<Grid
			item
			{...grid}
		>
			<Card
				sx={{
					p: 0,
					'& .MuiCardHeader-action': {
						paddingRight: '1rem',
						alignSelf: 'center',
					},
					...sx,
				}}
			>
				{(title) && (
					<>
						<CardHeading
							title={title}
							subheader={subheader}
							action={headingNode}
							sx={headingSx}
						/>
						{dividers && <Divider />}
					</>
				)}
				{(headingNode && !title) && (
					<>
						<Box
							sx={{
								p: 2,
								...headingSx,
							}}
						>
							<Stack
								direction="row"
								spacing={1}
								alignItems="center"
								justifyContent="space-between"
							>
								{headingNode}
							</Stack>
						</Box>
						{dividers && <Divider />}
					</>
				)}
				<Box
					sx={{
						px: 2,
						py: 3,
						...contentSx,
					}}
				>
					<Stack>
						{children}
					</Stack>
				</Box>
				{footerNode && (
					<>
						{dividers && <Divider />}
						<Box
							sx={{
								p: 2,
								...footerSx,
							}}
						>
							<Stack
								direction="row"
								spacing={1}
								alignItems="center"
								justifyContent="space-between"
							>
								{footerNode}
							</Stack>
						</Box>
					</>
				)}
			</Card>
		</Grid>
	);
};

export default TileBase;
