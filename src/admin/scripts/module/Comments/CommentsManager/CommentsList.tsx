import React from 'react';
import { Box } from '@mui/material';

import config from '../../../config';
import { CommentsItemProps } from '../../../types/model';
import CommentsListItem from './CommentsListItem';

export interface CommentsListProps {
	comments: CommentsItemProps[];
	onReply: (id: number) => void;
	onUpdate: (id: number) => void;
	onDelete: (id: number) => void;
	onReport: (id: number) => void;
	userEmail: string;
}

const CommentsList = (props: CommentsListProps) => {
	const {
		comments = [],
		onReply,
		onUpdate,
		onDelete,
		onReport,
		userEmail,
	} = props;

	return (
		<Box>
			{comments.map((comment) => {
				const userIsAuthor = comment.email === userEmail || config.project.extras.OVERRIDE_ADMIN_EDIT_COMMENT_GLOBAL;

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
