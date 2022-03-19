import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';

import { useComments } from '../../../hooks/model';
import useProfile from '../../../hooks/useProfile';
import { CommentsItemProps } from '../../../types/model';
import {
	TextPreloader,
	ConfirmDialog,
} from '../../../component/ui';
import CommentsList from './CommentsList';
import CommentsDetail from './CommentsDetail';
import { getDetailData } from '../../../utils';

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
	const [ updating, setUpdating ] = useState(false);
	const [ confirmOpen, setConfirmOpen ] = useState(false);
	const [ confirmContext, setConfirmContext ] = useState<'delete' | 'report_comment' | null>(null);
	const [ confirmData, setConfirmData ] = useState<number[]>([]);
	const [ detailOpen, setDetailOpen ] = useState(false);
	const [ detailData, setDetailData ] = useState<CommentsItemProps | null>(null);
	const {
		profile,
	} = useProfile();
	const {
		comments,
		commentsWithChildrenAndProps,
		createComments,
		updateComments,
		reportComments,
		deleteComments,
	} = useComments();

	const userEmail = profile.email;

	const loadComments = async () => {
		setLoading(true);
		await commentsWithChildrenAndProps(
			model,
			detailId,
		).then((resp) => {
			setLoadedComments(resp?.data?.reverse() || []);
			setLoading(false);
		});
	};

	const replyHandler = (id: number) => {
		const detail = getDetailData(
			'Comments',
			comments,
			'new',
		);
		detail.parent = id;
		setDetailOpen(true);
		setDetailData(detail);
	};
	const updateHandler = (id: number) => {
		setDetailData(getDetailData(
			'Comments',
			comments,
			id,
		));
		setDetailOpen(true);
	};
	const submitHandler = (master: CommentsItemProps) => {
		setUpdating(true);
		const method = master.id === 'new' ? 'create' : 'update';
		if (method === 'create') {
			return createComments(master).then((resp) => {
				loadComments().then(() => {
					setUpdating(false);
					return resp;
				});
			});
		} else if (method === 'update') {
			return updateComments(master).then((resp) => {
				loadComments().then(() => {
					setUpdating(false);
					return resp;
				});
			});
		}

		return new Promise<unknown>(() => {
			console.warn('no promise');
			setUpdating(false);
			return null;
		});
	};
	const confirmDialogConfirmHandler = () => {
		const master = [ ...confirmData ];
		if (confirmContext === 'delete') {
			return deleteComments(master).then((resp) => {
				loadComments().then(() => {
					return resp;
				});
			});
		} else if (confirmContext === 'report_comment') {
			return reportComments(master).then((resp) => {
				loadComments().then(() => {
					return resp;
				});
			});
		}

		return new Promise<unknown>(() => { console.warn('no promise') });
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
				userEmail={userEmail}
			/>
			{loading || updating && (
				<Box sx={{ py: 2 }}>
					<TextPreloader />
				</Box>
			)}
			<CommentsDetail
				open={detailOpen}
				detailData={detailData}
				onClose={closeDetailHandler}
				onSubmit={submitHandler}
				model={model}
				modelId={detailId}
				userEmail={userEmail}
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
