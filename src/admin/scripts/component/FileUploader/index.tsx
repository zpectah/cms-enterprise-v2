import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { styled, Box, BoxProps } from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';

import { file as fileUtils, string as stringUtils } from '../../../../../utils/helpers';
import { UPLOAD_IMAGE_LIMIT, UPLOAD_FILE_LIMIT } from '../../constants';
import useToasts from '../../hooks/useToasts';
import { uploadItemTemporaryType } from '../../types/uploader';
import { getFileType } from '../../utils';
import { BarPreloader } from '../ui';

export interface FileUploaderProps {
	id?: string;
	multiple?: boolean;
	onAdd: (files: uploadItemTemporaryType[]) => void;
	render?: () => React.ReactNode;
	disableDragAndDrop?: boolean;
	compact?: boolean;
	rounderProps?: BoxProps;
}

const StyledLabelWrapper = styled('label')`
	position: relative;
`;
const StyledInputElement = styled('input')`
	width: 1px;
	height: 1px;
	position: absolute;
	top: 0;
	left: 0;
	opacity: 0;
`;
const DragWrapper = styled('label')`
	width: 100vw;
	height: 100vh;
	position: fixed;
	top: 0;
	left: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 1250;
	color: rgb(200,200,200);
	background-color: rgba(25,25,25,.75);
`;
const UploaderRoundedBox = styled(Box)`
	width: 100%;
	padding: 5rem;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: row;
	border: 5px dashed rgba(200,200,200,.5);
	border-radius: 1rem;
`;
const FakeUploaderButton = styled('span')`
	width: auto;
	height: auto;
	padding: .5rem .75rem;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	flex-direction: row;
	border: 1px solid rgba(175,175,175,.5);
	border-radius: 4px;
	cursor: pointer;
	
	&:hover{
		border-color: rgba(175,175,175,.75);
	}
`;

const FileUploader = (props: FileUploaderProps) => {
	const {
		id = 'FileUploader',
		multiple,
		onAdd,
		render,
		disableDragAndDrop,
		compact,
		rounderProps,
	} = props;

	const inputRef = useRef();

	const { t } = useTranslation([ 'components' ]);
	const [ processing, setProcessing ] = useState(false);
	const [ dragOver, setDragOver ] = useState(false);
	const { createErrorToast } = useToasts();

	const getFileObject = async (blob, file) => {
		const file_extension = file.name.split('.').pop().toLowerCase();
		const file_type = getFileType(file_extension);
		const file_size = file.size;

		return {
			tmp_id: stringUtils.getToken(2, ''),
			file_extension,
			file_type,
			file_size,
			file_mime: file.type,
			file_name: file.name,
			fileBase64: blob,
		} as uploadItemTemporaryType;
	};
	const getFileBlob = async (file) => {
		const blob = await fileUtils.toBase64(file);
		return getFileObject(blob, file);
	};
	const addHandler = async (files: any[]) => {
		const fileList = [];

		return files.map(async (file) => {
			const file_extension = file.name.split('.').pop().toLowerCase();
			const file_type = getFileType(file_extension);
			if (file_type !== 'undefined') {
				if (file_type === 'image') {
					if (file.size <= UPLOAD_IMAGE_LIMIT) {
						const fileObject = await getFileBlob(file);
						fileList.push(fileObject);

						return onAdd(fileList);
					} else {
						createErrorToast({ title: t('components:FileUploader.messages.image_over_size_limit') });
					}
				} else if (file.size <= UPLOAD_FILE_LIMIT) {
					const fileObject = await getFileBlob(file);

					fileList.push(fileObject);
					return onAdd(fileList);
				} else {
					createErrorToast({ title: t('components:FileUploader.messages.file_over_size_limit') });
				}
			} else {
				createErrorToast({ title: t('components:FileUploader.messages.file_not_supported') });
			}
		});
	};

	const inputProps = {
		type: 'file',
		name: 'FileUploaderInput',
		id: `${id}_input`,
		ref: inputRef,
		multiple,
		onChange: async (e) => {
			setProcessing(true);
			const files = Array.from(e.target.files);
			if (files) {
				setProcessing(false);
				await addHandler(files);
				e.target.value = null;
				e.target.files = null;
			}
		},
	};
	const dragEvents = {
		onDrop: async (e) => {
			e.stopPropagation();
			e.preventDefault();
			setProcessing(true);
			setDragOver(false);
			const files = Array.from(e.dataTransfer.files);
			if (files) {
				setProcessing(false);
				await addHandler(files);
			}
		},
		onDragOver: (e) => {
			e.stopPropagation();
			e.preventDefault();

			return false;
		},
		onDragEnter: (e) => {
			e.stopPropagation();
			e.preventDefault();
			setDragOver(true);

			return false;
		},
		onDragLeave: (e) => {
			e.stopPropagation();
			e.preventDefault();
			setDragOver(false);

			return false;
		},
	};

	const onInit = () => {
		if (!disableDragAndDrop) {
			window.addEventListener('mouseup', dragEvents.onDragLeave);
			window.addEventListener('dragover', dragEvents.onDragOver);
			window.addEventListener('dragenter', dragEvents.onDragEnter);
			window.addEventListener('drop', dragEvents.onDrop);
		}
	};
	const onDestroy = () => {
		if (!disableDragAndDrop) {
			window.removeEventListener('mouseup', dragEvents.onDragLeave);
			window.removeEventListener('dragover', dragEvents.onDragOver);
			window.removeEventListener('dragenter', dragEvents.onDragEnter);
			window.removeEventListener('drop', dragEvents.onDrop);
		}
	};

	const renderUploaderWrapper = (children: React.ReactNode) => {
		if (compact) {
			return children;
		}

		return (
			<UploaderRoundedBox
				{...rounderProps}
			>
				{children}
			</UploaderRoundedBox>
		);
	};

	useEffect(() => {
		onInit();

		return () => onDestroy();
	}, []);

	return (
		<>
			{processing && <BarPreloader />}
			{(!disableDragAndDrop && dragOver) && (
				<DragWrapper
					onDragLeave={dragEvents.onDragLeave}
					htmlFor={inputProps.id}
				>
					<FakeUploaderButton
						style={{ borderColor: 'transparent' }}
					>
						<CloudDownloadIcon
							fontSize="large"
							sx={{
								mr: 2,
							}}
						/>
						{t('components:FileUploader.label.drop_files')}
					</FakeUploaderButton>
				</DragWrapper>
			)}
			<StyledLabelWrapper
				htmlFor={inputProps.id}
			>
				{render ? render() : renderUploaderWrapper(
					<FakeUploaderButton>
						<FileUploadIcon
							sx={{
								mr: 1,
							}}
						/>
						{t('components:FileUploader.label.select_files')}
					</FakeUploaderButton>
				)}
				<StyledInputElement
					{...inputProps}
				/>
			</StyledLabelWrapper>
		</>
	);
};

export default FileUploader;
