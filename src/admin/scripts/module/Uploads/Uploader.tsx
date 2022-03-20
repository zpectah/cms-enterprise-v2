import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
	Divider,
	Stack,
	Alert,
} from '@mui/material';

import config from '../../config';
import { uploadItemTemporaryType } from '../../types/uploader';
import { UploadsItemProps } from '../../types/model';
import {
	Button,
	PrimaryButton,
	BarPreloader,
} from '../../component/ui';
import FileUploader from '../../component/FileUploader';
import UploaderQueueItem from './UploaderQueueItem';
import { transformString } from '../../utils';

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

	const { t } = useTranslation([ 'components', 'messages' ]);
	const [ queue, setQueue ] = useState<combinedUploadsItemProps[]>([]);
	const [ duplicityError, setDuplicityError ] = useState(false);
	const [ queueDuplicityError, setQueueDuplicityError ] = useState(false);
	const [ processing, setProcessing ] = useState(false);

	const checkQueueDuplicates = (queue: combinedUploadsItemProps[]) => {
		const names = [];
		queue.map((item) => {
			names.push(item.name);
		});
		const duplicity = names.some((item, index) => index !== names.indexOf(item));
		setQueueDuplicityError(duplicity);
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
		checkQueueDuplicates(tmp);
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
		checkQueueDuplicates(tmp);
		setQueue(tmp);
	};

	const submitHandler = useCallback(() => {
		setProcessing(true);
		const count = queue.length;
		let counter = 0;

		return queue.map((item) => {
			counter = counter + 1;
			if (count === counter && onFinishSubmit) {
				onFinishSubmit(count);
				resetQueueHandler();
				setProcessing(false);
			}
			return onSubmitItem(item);
		});
	}, [ queueDuplicityError, queue ]);
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
			{processing && <BarPreloader />}
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
			{queue.map((file, index) => (
				<UploaderQueueItem
					key={file.tmp_id}
					data={file}
					onRemove={removeHandler}
					onChange={(file) => itemChangeHandler(file, index)}
					onCropImageUpdate={(file, blob) => itemChangeHandler({
						...file,
						fileBase64_cropped: blob,
					}, index)}
					onDuplicityError={(error) => setDuplicityError(error)}
				/>
			))}
			{queue.length > 0 && (
				<>
					{queueDuplicityError && (
						<Alert
							severity="error"
							sx={{ mt: 2.5 }}
						>
							{t('messages:form.duplicate_queue')}
						</Alert>
					)}
					<Stack
						direction="row"
						alignItems="center"
						justifyContent="center"
						spacing={2}
						sx={{ mt: 2.5 }}
					>
						<PrimaryButton
							onClick={submitHandler}
							disabled={queueDuplicityError || duplicityError}
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
				</>
			)}
		</>
	);
};

export default Uploader;
