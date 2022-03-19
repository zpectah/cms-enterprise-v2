import React from 'react';

import { CommentsItemProps } from '../../../types/model';
import { Dialog } from '../../../component/ui';

export interface CommentsDetailProps {
	open: boolean;
	onClose: () => void;
	onSubmit: (data: CommentsItemProps) => void;
	detailData?: CommentsItemProps;
}

const CommentsDetail = (props: CommentsDetailProps) => {
	const {
		open,
		onClose,
		onSubmit,
		detailData,
	} = props;

	return (
		<Dialog
			open={open}
			onClose={onClose}
		>
			CommentsDetail ... {JSON.stringify(detailData, null, 2)}
		</Dialog>
	);
};

export default CommentsDetail;
