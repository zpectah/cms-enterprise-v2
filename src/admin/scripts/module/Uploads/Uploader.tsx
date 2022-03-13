import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
	Divider,
	Stack,
} from '@mui/material';

import config from '../../config';
import { uploadItemTemporaryType } from '../../types/uploader';
import { UploadsItemProps } from '../../types/model';
import {
	Button,
	PrimaryButton,
} from '../../component/ui';
import FileUploader from '../../component/FileUploader';
import UploaderQueueItem from './UploaderQueueItem';

type combinedUploadsItemProps = uploadItemTemporaryType & UploadsItemProps;
export interface UploaderProps {
	modelData: UploadsItemProps;
	onSubmitItem: (master: UploadsItemProps) => Promise<unknown>;
	onFinishSubmit?: (count: number) => void;
}

const Uploader = (props: UploaderProps) => {
	const {
		modelData,
		onSubmitItem,
		onFinishSubmit,
	} = props;

	const { t } = useTranslation([ 'components' ]);
	const [ queue, setQueue ] = useState<combinedUploadsItemProps[]>([]);
	const [ duplicityError, setDuplicityError ] = useState(false);

	const checkDuplicates = (queue: combinedUploadsItemProps[]) => {
		let duplicity = false;


		console.log('check duplicates ...', queue);

		// TODO: check valid across queue (name duplicates) and check if in DB is duplicity ...


		setDuplicityError(duplicity);
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
		checkDuplicates(tmp);
		return tmp;
	};

	const resetQueueHandler = () => setQueue([]);
	const itemChangeHandler = (data: combinedUploadsItemProps, index: number) => {
		const tmp = [
			...queue,
		];
		tmp[index] = {
			...data,
		};
		checkDuplicates(tmp);
		setQueue(tmp);
	};

	const submitHandler = useCallback(() => {
		const count = queue.length;
		let counter = 0;

		return queue.map((item) => {
			counter = counter + 1;
			onSubmitItem(item);
			if (count === counter && onFinishSubmit) {
				onFinishSubmit(count);
				resetQueueHandler();
			}
		});
	}, [ duplicityError, queue ]);
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
					marginBottom: '2rem',
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
			{queue.reverse().map((file, index) => (
				<UploaderQueueItem
					key={file.tmp_id}
					data={file}
					onRemove={removeHandler}
					onChange={(file) => itemChangeHandler(file, index)}
					onCropImageUpdate={(file, blob) => itemChangeHandler({
						...file,
						fileBase64_cropped: blob,
					}, index)}
				/>
			))}
			{queue.length > 0 && (
				<Stack
					direction="row"
					alignItems="center"
					justifyContent="center"
					spacing={2}
					sx={{
						mt: 2.5,
					}}
				>
					<PrimaryButton
						onClick={submitHandler}
						disabled={duplicityError}
					>
						{t('components:Uploader.label.submit_queue')}
					</PrimaryButton>
					<Button
						color="warning"
						onClick={resetQueueHandler}
					>
						{t('components:Uploader.label.clear_queue')}
					</Button>
				</Stack>
			)}
		</>
	);
};

export default Uploader;
