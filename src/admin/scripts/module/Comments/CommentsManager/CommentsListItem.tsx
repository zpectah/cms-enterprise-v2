import React from 'react';
import {
	Box,
	Card,
	CardActions,
	CardContent,
	Typography,
} from '@mui/material';

import { CommentsItemProps } from '../../../types/model';
import { Button } from '../../../component/ui';

export interface CommentsListItemProps {
	detail: CommentsItemProps;
	userIsAuthor?: boolean;
	onReply: (id: number) => void;
	onUpdate: (id: number) => void;
	onDelete: (id: number) => void;
	onReport: (id: number) => void;
}

const CommentsListItem = (props: CommentsListItemProps) => {
	const {
		detail,
		userIsAuthor,
		onReply,
		onUpdate,
		onDelete,
		onReport,
	} = props;

	return (
		<Box
			sx={{
				mb: 2,
			}}
		>
			<Card>
				<CardContent>
					<Typography
						variant="caption"
					>
						#{detail.id} | {detail.email} | {detail.created}
					</Typography>
					<Typography
						variant="h5"
						gutterBottom
					>
						{detail.title}
					</Typography>
					<Typography>
						{detail.content}
					</Typography>
				</CardContent>
				<CardActions>
					<Button
						onClick={() => onReply(detail.id as number)}
					>
						Reply
					</Button>
					<Button
						onClick={() => onUpdate(detail.id as number)}
						disabled={!userIsAuthor}
					>
						Update
					</Button>
					<Button
						onClick={() => onDelete(detail.id as number)}
					>
						Delete
					</Button>
					<Button
						onClick={() => onReport(detail.id as number)}
					>
						Report
					</Button>
				</CardActions>
			</Card>
			{detail.children.length > 0 && (
				<Box
					sx={{
						mt: 1,
						pl: 2,
					}}
				>
					{detail.children.reverse().map((child) => (
						<CommentsListItem
							key={child.id}
							detail={child}
							onReply={onReply}
							onUpdate={onUpdate}
							onDelete={onDelete}
							onReport={onReport}
							userIsAuthor={userIsAuthor}
						/>
					))}
				</Box>
			)}
		</Box>
	);
};

export default CommentsListItem;
