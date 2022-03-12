import React, { useCallback, useState } from 'react';

import config from '../../config';
import { uploadItemTemporaryType } from '../../types/uploader';
import { UploadsItemProps } from '../../types/model';
import FileUploader from '../../component/FileUploader';
import UploaderQueueItem from './UploaderQueueItem';

type combinedUploadsItemProps = uploadItemTemporaryType & UploadsItemProps;
export interface UploaderProps {
	modelData: UploadsItemProps;
}

const Uploader = (props: UploaderProps) => {
	const {
		modelData,
	} = props;

	const [ queue, setQueue ] = useState<combinedUploadsItemProps[]>([]);

	const onItemChange = (data: UploadsItemProps, index: number) => {
		console.log('onItemChange', data, queue[index]);
	};

	const getUpdatedQueue = (files: uploadItemTemporaryType[]) => {
		const tmp = [];
		const ni = [
			...files,
		];
		ni.map((file) => {
			tmp.push({
				...modelData,
				...file,
				type: file.file_type,
				name: file.file_name.split('.').slice(0, -1).join('.'),
			});
		});

		return tmp;
	};

	const addHandler = useCallback((files: uploadItemTemporaryType[]) => {
		const tmp = [
			...queue,
			...getUpdatedQueue(files),
		];
		setQueue(tmp);
	}, [ queue ]);
	const removeHandler = useCallback((id: string) => {
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
					onAdd={addHandler}
					compact={queue.length > 0}
					disableDragAndDrop={queue.length > 0}
					multiple
				/>

			</div>


			<br />

			{queue.map((file, index) => (
				<UploaderQueueItem
					key={file.tmp_id}
					data={file}
					onRemove={removeHandler}
					onChange={(file) => onItemChange(file, index)}
				/>
			))}

		</>
	);
};

export default Uploader;
