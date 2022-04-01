import React, { useEffect, useState } from 'react';
import { styled, Box, Stack } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

import {
	IconButton,
	Dialog, Button,
} from '../ui';
import FileUploader from '../FileUploader';
import ImageCropper from '../ImageCropper';
import { uploadItemTemporaryType } from '../../types/uploader';

export interface AvatarPickerProps {
	src?: Blob | null;
	onChange?: (blob: string) => void;
}

const AvatarPicker = (props: AvatarPickerProps) => {
	const {
		src,
		onChange,
	} = props;

	const [ source, setSource ] = useState<Blob | string | null>(src);
	const [ sourceTmp, setSourceTmp ] = useState<Blob | string | null>(null);
	const [ context, setContext ] = useState(src ? 'update' : 'new');
	const [ dialogOpen, setDialogOpen ] = useState(false);
	const [ cropperSource, setCropperSource ] = useState<Blob | null>(null);

	const confirmHandler = () => {
		setSource(sourceTmp as Blob);
		onChange(sourceTmp as string);
		setDialogOpen(false);
	};

	return (
		<>
			<Box
				sx={{
					width: '150px',
					height: '150px',
					borderRadius: '150px',
					position: 'relative',
					overflow: 'hidden',
					backgroundColor: 'rgba(0,0,0,.05)',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				{source ? (
					<>
						<img
							src={source as string}
							alt="img"
							style={{
								maxWidth: '100%',
								height: 'auto',
							}}
						/>
					</>
				) : (
					<Stack
						spacing={2}
					>

						<IconButton
							onClick={() => {
								console.log('open dialog ...');
								setDialogOpen(true);
							}}
							size="medium"
						>
							<AddPhotoAlternateIcon
								fontSize="medium"
							/>
						</IconButton>

					</Stack>
				)}
			</Box>

			<Dialog
				open={dialogOpen}
				onClose={() => setDialogOpen(false)}
			>
				<div>

					{sourceTmp && (
						<>
							<img
								src={sourceTmp as string}
								alt="img"
								style={{
									maxWidth: '100%',
									height: 'auto',
								}}
							/>
						</>
					)}

					{cropperSource ? (
						<div>
							<ImageCropper
								source={cropperSource}
								onConfirm={(blob) => {
									console.log('confirmed avatar image', blob);

									setSourceTmp(blob);
									setCropperSource(null);
								}}
								minImgSize={100}
								maxImgSize={300}
								avatarAspect
							/>
							<Button
								onClick={() => {
									setCropperSource(null);
								}}
							>
								Dismiss
							</Button>
						</div>
					) : (
						<div>
							<FileUploader
								id="AvatarFileUploader"
								onAdd={(files: uploadItemTemporaryType[]) => {
									console.log('file', files[0]);
									setCropperSource(files[0].fileBase64);
								}}
								compact
							/>
						</div>
					)}

					dialog
					<br />
					{context}
					<br />

					<Button
						onClick={confirmHandler}
						disabled={!sourceTmp}
					>
						Confirm
					</Button>

				</div>
			</Dialog>

		</>
	);
};

export default AvatarPicker;
