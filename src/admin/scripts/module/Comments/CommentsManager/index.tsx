import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';

import { useComments } from '../../../hooks/model';
import { CommentsItemProps } from '../../../types/model';
import {
	TextPreloader,
	ConfirmDialog,
	Dialog,
} from '../../../component/ui';
import CommentsList from './CommentsList';
import CommentsDetail from './CommentsDetail';

export interface CommentsManagerProps {
	model: 'Posts' | 'Categories';
	detailId: number;
}

const CommentsManager = (props: CommentsManagerProps) => {
	const {
		model,
		detailId,
	} = props;

	const [ loadedComments, setLoadedComments ] = useState<CommentsItemProps[]>([]);
	const [ loading, setLoading ] = useState(false);
	const [ confirmOpen, setConfirmOpen ] = useState(false);
	const [ confirmContext, setConfirmContext ] = useState<'delete' | 'report_comment' | null>(null);
	const [ confirmData, setConfirmData ] = useState<number[]>([]);
	const [ detailOpen, setDetailOpen ] = useState(false);
	const [ detailData, setDetailData ] = useState<CommentsItemProps | null>(null);
	const {
		commentsWithChildrenAndProps,
		createComments,
		updateComments,
		reportComments,
		deleteComments,
	} = useComments();

	const loadComments = async () => {
		setLoading(true);
		await commentsWithChildrenAndProps(
			model,
			detailId,
		).then((resp) => {
			setLoadedComments(resp.data || []);
			setLoading(false);
		});
	};

	const replyHandler = (id: number) => {
		console.log('replyHandler', id);
		// open dialog ... reply
		setDetailOpen(true);
		setDetailData(null); // TODO
	};
	const updateHandler = (id: number) => {
		console.log('updateHandler', id);
		// open dialog ... update
		setDetailOpen(true);
		setDetailData(null); // TODO
	};
	const submitHandler = (data: CommentsItemProps) => {
		console.log('submitHandler', data);
		// TODO: submit (create / update)
	};
	const confirmDialogConfirmHandler = () => {
		console.log('confirm data', confirmContext, confirmData);
		// TODO: handle by context ...
	};
	const deleteHandler = (id: number) => {
		setConfirmOpen(true);
		setConfirmContext('delete');
		setConfirmData([ id ]);
	};
	const reportHandler = (id: number) => {
		setConfirmOpen(true);
		setConfirmContext('report_comment');
		setConfirmData([ id ]);
	};
	const closeConfirmHandler = () => {
		setConfirmOpen(false);
		setConfirmContext(null);
		setConfirmData([]);
	};
	const closeDetailHandler = () => {
		setDetailOpen(false);
		setDetailData(null);
	};

	useEffect(() => {
		loadComments();

		return () => {};
	}, []);

	return (
		<>
			<CommentsList
				comments={loadedComments}
				onReply={replyHandler}
				onUpdate={updateHandler}
				onDelete={deleteHandler}
				onReport={reportHandler}
			/>
			{loading && (
				<Box sx={{ py: 2 }}>
					<TextPreloader />
				</Box>
			)}
			<CommentsDetail
				open={detailOpen}
				detailData={detailData}
				onClose={closeDetailHandler}
				onSubmit={submitHandler}
			/>
			<ConfirmDialog
				context={confirmContext}
				open={confirmOpen}
				confirmData={confirmData}
				onConfirm={confirmDialogConfirmHandler}
				onClose={closeConfirmHandler}
			/>
		</>
	);
};

export default CommentsManager;
