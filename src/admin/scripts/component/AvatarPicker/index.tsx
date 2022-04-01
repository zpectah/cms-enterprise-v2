import React, { useEffect, useState } from 'react';
import { styled, Box, Stack } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import EditIcon from '@mui/icons-material/Edit';

import palette from '../../styles/palette';
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

	const temporarySource: Blob | null = src;

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
				<Stack
					spacing={2}
					alignItems="center"
					justifyContent="center"
					sx={{
						width: '100%',
						height: '100%',
					}}
					className="avatar-img-cover"
				>
					{source ? (
						<IconButton
							onClick={() => {
								setDialogOpen(true);
							}}
							size="medium"
							sx={{
								backgroundColor: palette.light,
								opacity: 0,
								'&:hover': {
									backgroundColor: palette.light,
								},
								'.avatar-img-cover:hover &': {
									opacity: 1,
								},
							}}
						>
							<EditIcon
								fontSize="medium"
							/>
						</IconButton>
					) : (
						<IconButton
							onClick={() => {
								setDialogOpen(true);
							}}
						>
							<AddPhotoAlternateIcon
								fontSize="medium"
							/>
						</IconButton>
					)}
				</Stack>
				{source && (
					<img
						src={source as string}
						alt="img"
						style={{
							maxWidth: '100%',
							height: 'auto',
							position: 'absolute',
							top: 0,
							left: 0,
							zIndex: -1,
						}}
					/>
				)}
			</Box>

			<Dialog
				open={dialogOpen}
				onClose={() => setDialogOpen(false)}
				title="Select your avatar image"
				showBodyClose
				showFooterClose
				actions={
					<>
						<Button
							onClick={confirmHandler}
							disabled={!sourceTmp}
						>
							Confirm
						</Button>
						<Button
							onClick={() => {
								setCropperSource(null);
							}}
							disabled={!cropperSource}
						>
							Cancel
						</Button>
					</>
				}
			>
				<div>

					<Stack
						direction="row"
						spacing={2}
						alignItems="flex-start"
						justifyContent="flex-start"
						sx={{
							mb: 2,
						}}
					>

						{(source || sourceTmp) && (
							<div
								style={{
									width: '100px',
									height: '100px',
								}}
							>
								<img
									src={source as string || sourceTmp as string}
									alt="img"
									style={{
										maxWidth: '100%',
										height: 'auto',
									}}
								/>
							</div>
						)}

					</Stack>
					<Stack
						direction="row"
						spacing={2}
						alignItems="flex-start"
						justifyContent="flex-start"
						sx={{
							mb: 2,
						}}
					>

						{temporarySource && (
							<div
								style={{
									width: '100px',
									height: '100px',
								}}
								onClick={() => {

									setSource(temporarySource);

								}}
							>
								<img
									src={String(temporarySource)}
									alt="default"
									style={{
										maxWidth: '100%',
										height: 'auto',
									}}
								/>
							</div>
						)}

						<div
							style={{
								width: '100px',
								height: '100px',
							}}
							onClick={() => {

								setSource('/assets/avatar/default.png');

							}}
						>
							<img
								src="/assets/avatar/default.png"
								alt="default"
								style={{
									maxWidth: '100%',
									height: 'auto',
								}}
							/>
						</div>

					</Stack>

					{cropperSource ? (
						<div>
							<ImageCropper
								source={cropperSource}
								onConfirm={(blob) => {
									console.log('confirmed avatar image', blob);

									setSourceTmp(blob);
									setCropperSource(null);
								}}
								minImgSize={250}
								maxImgSize={750}
								avatarAspect
							/>
						</div>
					) : (
						<div>
							<FileUploader
								id="AvatarFileUploader"
								onAdd={(files: uploadItemTemporaryType[]) => {
									setCropperSource(files[0].fileBase64);
								}}
								compact
								imageOnly
							/>
						</div>
					)}



				</div>
			</Dialog>

		</>
	);
};

export default AvatarPicker;
