import React, { useCallback, useState } from 'react';

import config from '../../config';
import { uploadItemTemporaryType } from '../../types/uploader';
import FileUploader from '../../component/FileUploader';
import UploaderQueueItem from './UploaderQueueItem';

export interface UploaderProps {}

const Uploader = (props: UploaderProps) => {
	const {} = props;

	const [ queue, setQueue ] = useState<uploadItemTemporaryType[]>([]);

	const onAddHandler = useCallback((files: uploadItemTemporaryType[]) => {
		const tmp = [
			...queue,
			...files,
		];
		setQueue(tmp);
	}, [ queue ]);

	const onRemoveHandler = useCallback((id: string) => {
		const tmp = [ ...queue ];
		const item = tmp.find((item) => item.tmp_id === id);
		const index = tmp.indexOf(item);
		tmp.splice(index, 1);
		setQueue(tmp);
	}, [ queue ]);

	return (
		<>
			<div
				style={{
					width: '100%',
				}}
			>

				<FileUploader
					id="ModelFileUploader"
					onAdd={onAddHandler}
					compact={queue.length > 0}
					disableDragAndDrop={queue.length > 0}
					multiple
				/>

			</div>


			<br />

			{queue.map((file) => (
				<UploaderQueueItem
					key={file.tmp_id}
					data={file}
					onRemove={onRemoveHandler}
					onSubmit={(item) => {console.log('onSubmit', item) }}
				/>
			))}

		</>
	);
};

export default Uploader;
