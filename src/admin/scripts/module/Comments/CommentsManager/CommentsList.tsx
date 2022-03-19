import React from 'react';
import { Box } from '@mui/material';

import { CommentsItemProps } from '../../../types/model';
import CommentsListItem from './CommentsListItem';

export interface CommentsListProps {
	comments: CommentsItemProps[];
	onReply: (id: number) => void;
	onUpdate: (id: number) => void;
	onDelete: (id: number) => void;
	onReport: (id: number) => void;
}

const CommentsList = (props: CommentsListProps) => {
	const {
		comments = [],
		onReply,
		onUpdate,
		onDelete,
		onReport,
	} = props;

	return (
		<Box>
			{comments.reverse().map((comment) => {
				const userIsAuthor = false; // TODO: get `email` of user

				return (
					<CommentsListItem
						key={comment.id}
						detail={comment}
						onReply={onReply}
						onUpdate={onUpdate}
						onDelete={onDelete}
						onReport={onReport}
						userIsAuthor={userIsAuthor}
					/>
				);
			})}
		</Box>
	);
};

export default CommentsList;
