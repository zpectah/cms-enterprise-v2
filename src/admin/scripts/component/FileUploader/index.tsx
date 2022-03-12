import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/material';

import { file as fileUtils } from '../../../../../utils/helpers';
import { UPLOAD_IMAGE_LIMIT, UPLOAD_FILE_LIMIT } from '../../constants';
import useToasts from '../../hooks/useToasts';
import { getFileType } from '../../utils/getFileType';

export interface FileUploaderProps {
	multiple?: boolean;
	onAdd: (files: any | any[]) => void;
	render?: () => React.ReactNode;
	id?: string;
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

const FileUploader = (props: FileUploaderProps) => {
	const {
		multiple,
		onAdd,
		render,
		id = 'FileUploader',
	} = props;

	const { t } = useTranslation([ 'components' ]);
	const [ processing, setProcessing ] = useState(false);
	const [ dragOver, setDragOver ] = useState(false);
	const { createErrorToast } = useToasts();

	const getFileObject = (blob, file) => {
		const file_extension = file.name.split('.').pop().toLowerCase();
		const file_type = getFileType(file_extension);
		const file_size = file.size;

		return {
			file_extension,
			file_type,
			file_size,
			file_mime: file.type,
			file_name: file.name,
			file_base64: blob,
			file_base64_cropped: null,
		};
	};
	const getFileBlob = async (file) => {
		const blob = await fileUtils.toBase64(file);
		return getFileObject(blob, file);
	};
	const addHandler = async (files: any[]) => {
		return files.map(async (file) => {
			const file_extension = file.name.split('.').pop().toLowerCase();
			const file_type = getFileType(file_extension);
			if (file_type !== 'undefined') {
				if (file_type === 'image') {
					if (file.size <= UPLOAD_IMAGE_LIMIT) {
						const fileObject = await getFileBlob(file);

						return onAdd([ fileObject ]);
					} else {
						createErrorToast({ title: t('components:FileUploader.messages.image_over_size_limit') });
					}
				} else if (file.size <= UPLOAD_FILE_LIMIT) {
					const fileObject = await getFileBlob(file);

					return onAdd([ fileObject ]);
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
		multiple,
		onChange: async (e) => {
			setProcessing(true);
			let files = [...e.target.files];
			if (files) {
				await addHandler(files);
				await setProcessing(false);
			}
		},
	};
	const dragEvents = {
		onDrop: async (e) => {
			e.stopPropagation();
			e.preventDefault();
			setDragOver(false);
			setProcessing(true);
			let files = [...e.dataTransfer.files];
			if (files) {
				await addHandler(files);
				await setProcessing(false);
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
		window.addEventListener('mouseup', dragEvents.onDragLeave);
		window.addEventListener('dragover', dragEvents.onDragOver);
		window.addEventListener('dragenter', dragEvents.onDragEnter);
		window.addEventListener('drop', dragEvents.onDrop);
	};
	const onDestroy = () => {
		window.removeEventListener('mouseup', dragEvents.onDragLeave);
		window.removeEventListener('dragover', dragEvents.onDragOver);
		window.removeEventListener('dragenter', dragEvents.onDragEnter);
		window.removeEventListener('drop', dragEvents.onDrop);
	};

	useEffect(() => {
		onInit();

		return () => onDestroy();
	}, []);

	return (
		<>
			{dragOver ? 'dragOver' : '...'}
			{processing ? 'processing' : 'no processing'}
			<StyledLabelWrapper
				htmlFor={inputProps.id}
			>
				{render ? render() : (
					<>
						Select files to upload
					</>
				)}
				<StyledInputElement
					{...inputProps}
				/>
			</StyledLabelWrapper>
		</>
	);
};

export default FileUploader;
