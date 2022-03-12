import React, { useState } from 'react';
import {
	Card,
	CardProps,
	CardMedia,
	CardMediaProps,
	CardContent,
	CardContentProps,
	CardActions,
	CardActionsProps,
	Collapse,
	Typography,
	Divider,
} from '@mui/material';

import CardHeading, { CardHeadingProps } from './CardHeading';

export interface CardBaseProps extends CardProps {
	collapsible?: boolean;
	title?: string;
	subheader?: string;
	headerAvatar?: React.ReactNode;
	cardHeadingProps?: CardHeadingProps;
	cardMediaProps?: CardMediaProps;
	cardContentProps?: CardContentProps;
	cardActionsProps?: CardActionsProps;
	collapse?: boolean;
	children?: React.ReactNode;
	text?: string;
	actionsNode?: React.ReactNode;
	actionsDivider?: boolean;
}

const CardBase = (props: CardBaseProps) => {
	const {
		collapsible,
		collapse,
		title,
		subheader,
		headerAvatar,
		cardHeadingProps,
		cardMediaProps,
		cardContentProps,
		cardActionsProps,
		children,
		text,
		actionsNode,
		actionsDivider,
		...rest
	} = props;

	const [ open, setOpen ] = useState(collapse);

	const renderCardBody = (children: React.ReactNode) => {
		if (collapsible || collapse) {
			return (
				<Collapse
					in={open}
					timeout="auto"
					unmountOnExit
				>
					{children}
				</Collapse>
			);
		}

		return children;
	};

	return (
		<Card
			sx={{
				width: '100%',
				mb: 1.5,
			}}
			{...rest}
		>
			{title && (
				<CardHeading
					title={title}
					subheader={subheader}
					avatar={headerAvatar}
					collapsible={collapsible}
					collapse={open}
					afterCollapse={(open) => setOpen(open)}
					divider
					{...cardHeadingProps}
				/>
			)}
			{renderCardBody(
				<>
					{cardMediaProps?.image && (
						<CardMedia
							{...cardMediaProps}
						/>
					)}
					{(children || text) && (
						<CardContent
							{...cardContentProps}
						>
							{children && children}
							{text && (
								<Typography
									paragraph
								>
									{text}
								</Typography>
							)}
						</CardContent>
					)}
				</>
			)}
			{actionsNode && (
				<>
					{actionsDivider && <Divider />}
					<CardActions
						{...cardActionsProps}
					>
						{actionsNode}
					</CardActions>
				</>
			)}
		</Card>
	);
};

export default CardBase;
