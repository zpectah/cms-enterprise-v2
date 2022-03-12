import React, { useCallback, useState, useMemo } from 'react';

import config from '../../config';
import FileUploader from '../../component/FileUploader';
import ImageCropper from '../../component/ImageCropper';

export interface UploaderProps {}

const Uploader = (props: UploaderProps) => {
	const {} = props;

	const [ queue, setQueue ] = useState<any[]>([]);

	const onAddHandler = useCallback((files: any[]) => {
		const nq = [
			...queue,
			...files,
		];
		setQueue(nq);
	}, [ queue ]);

	return (
		<>
			<div
				style={{
					width: '100%',
				}}
			>

				<FileUploader
					id="modelFileUploader"
					onAdd={onAddHandler}
					compact={queue.length > 0}
					multiple
				/>

			</div>


			<br />

			{queue.map((file) => (
				<div key={file.file_name}>
					{file.file_name}
				</div>
			))}

			<br />

			<ImageCropper />

		</>
	);
};

export default Uploader;
