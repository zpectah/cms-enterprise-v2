import React from 'react';

import { uploadItemTemporaryType } from '../../types/uploader';
import { UploadsItemProps } from '../../types/model';
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
		<div>

			{data.tmp_id} |
			{data.file_name} |
			{data.file_size} |
			{data.file_mime}

			<br />

			<button
				onClick={() => onRemove(data.tmp_id)}
			>
				remove
			</button>

			<br />

			{data.file_type === 'image' && (
				<ImageCropper />
			)}


			<br />
			<br />

		</div>
	);
};

export default UploaderQueueItem;
