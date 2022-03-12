import React, { useState } from 'react';

import config from '../../config';
import FileUploader from '../../component/FileUploader';
import ImageCropper from '../../component/ImageCropper';

export interface UploaderProps {}

const Uploader = (props: UploaderProps) => {
	const {} = props;

	const [ queue, setQueue ] = useState<any[]>([]); // TODO

	const onAddHandler = (files: any | any[]) => {

		console.log('on queue change', files);

		setQueue([
			...queue,
			...files,
		]);
	};

	return (
		<>

			<FileUploader
				onAdd={onAddHandler}
			/>

			<br />

			{JSON.stringify(queue, null, 2)}

			<br />

			<ImageCropper />

		</>
	);
};

export default Uploader;
