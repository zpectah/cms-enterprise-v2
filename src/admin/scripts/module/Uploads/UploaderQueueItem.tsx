import React from 'react';
import {
	Stack,
	Typography,
} from '@mui/material';

import { uploadItemTemporaryType } from '../../types/uploader';
import { UploadsItemProps } from '../../types/model';
import {
	Card,
	DeleteButton,
	SubmitButton,
	Button,
} from '../../component/ui';
import ImageCropper from '../../component/ImageCropper';

export interface UploaderQueueItemProps {
	data: uploadItemTemporaryType;
	onRemove: (id: string) => void;
	// onSubmit?: (item: UploadsItemProps) => Promise<unknown>;
	onSubmit?: (item: UploadsItemProps) => void; // TODO
}

const UploaderQueueItem = (props: UploaderQueueItemProps) => {
	const {
		data,
		onRemove,
		onSubmit,
	} = props;

	return (
		<Card
			id={data.tmp_id}
			title={data.file_name}
			collapsible
			collapse
			actionsNode={
				<Stack
					direction="row"
					alignItems="center"
					justifyContent="space-between"
					sx={{
						width: '100%',
					}}
				>
					<Stack
						direction="row"
						alignItems="center"
						justifyContent="space-between"
						sx={{
							px: 1,
						}}
					>
						<Typography
							variant="caption"
						>
							Mime: {data.file_mime}
							&nbsp;|
							Size: {data.file_size}
						</Typography>
					</Stack>
					<Stack
						direction="row"
						alignItems="center"
						justifyContent="space-between"
						spacing={2}
					>
						<Button
							color="success"
						>
							submit single ...
						</Button>
						<Button
							color="warning"
							onClick={() => onRemove(data.tmp_id)}
						>
							remove from queue
						</Button>
					</Stack>
				</Stack>
			}
		>

			{data.file_name} |
			{data.file_size} |
			{data.file_mime}

			<br />



			<br />

			{data.file_type === 'image' && (
				<ImageCropper />
			)}


			<br />
			<br />

		</Card>
	);
};

export default UploaderQueueItem;
