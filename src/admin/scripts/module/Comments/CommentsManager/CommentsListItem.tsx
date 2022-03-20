import React from 'react';
import { useTranslation } from 'react-i18next';
import {
	Box,
	Card,
	CardActions,
	CardContent,
	Typography,
	Stack,
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

	const { t } = useTranslation([ 'common' ]);

	return (
		<Box
			sx={{
				mb: 2,
			}}
			data-group-id={detail.id}
		>
			<Card>
				<CardContent>
					<Typography
						variant="caption"
						sx={{ opacity: .65 }}
					>
						{detail.email} | {detail.created}
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
					<Stack
						direction="row"
						alignItems="center"
						justifyContent="flex-start"
						spacing={2}
					>
						<Button
							onClick={() => onReply(detail.id as number)}
							variant="outlined"
							size="small"
						>
							{t('btn.reply')}
						</Button>
						<Button
							onClick={() => onUpdate(detail.id as number)}
							disabled={!userIsAuthor}
							size="small"
						>
							{t('btn.edit')}
						</Button>
						<Button
							onClick={() => onDelete(detail.id as number)}
							color="warning"
							size="small"
						>
							{t('btn.delete')}
						</Button>
						<Button
							onClick={() => onReport(detail.id as number)}
							color="error"
							size="small"
						>
							{t('btn.report')}
						</Button>
					</Stack>
				</CardActions>
			</Card>
			{detail.children.length > 0 && (
				<Box
					sx={{
						mt: 1,
						pl: 2,
					}}
				>
					{detail.children.map((child) => (
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
