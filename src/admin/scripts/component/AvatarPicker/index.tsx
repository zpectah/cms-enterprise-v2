import React, { useEffect, useState } from 'react';
import { styled, Box, Stack, SxProps, useTheme } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import EditIcon from '@mui/icons-material/Edit';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

import palette from '../../styles/palette';
import {
	IconButton,
	Dialog,
	Button,
	Image,
} from '../ui';
import FileUploader from '../FileUploader';
import ImageCropper from '../ImageCropper';
import { uploadItemTemporaryType } from '../../types/uploader';

const StyledImageWrapper = styled(Box)`
	width: 150px;
	height: 150px;
	position: relative;
	overflow: hidden;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 100%;
	background-color: rgba(0,0,0,.05);
`;

export interface ImageWrapperProps {
	children: React.ReactNode;
	selected?: boolean;
	sx?: SxProps;
	onClick?: () => void;
}
export interface AvatarPickerProps {
	src?: Blob | null;
	onChange?: (blob: string) => void;
}

const ImageWrapper = (props: ImageWrapperProps) => {
	const {
		children,
		selected,
		sx,
		onClick,
	} = props;
	const theme = useTheme();

	return (
		<StyledImageWrapper
			sx={{
				borderWidth: '3px',
				borderStyle: 'solid',
				borderColor: selected ? theme.palette.text['500'] : 'transparent',
				...sx,
			}}
			onClick={onClick}
		>
			{children}
		</StyledImageWrapper>
	);
};

const AvatarPicker = (props: AvatarPickerProps) => {
	const {
		src,
		onChange,
	} = props;

	const temporarySource: Blob | string = src;
	const staticAvatarList = [
		'/assets/avatar/default.png'
	];

	const [ source, setSource ] = useState<Blob | string | null>(src);
	const [ sourceTmp, setSourceTmp ] = useState<Blob | string | null>(src);
	const [ dialogOpen, setDialogOpen ] = useState(false);
	const [ cropperSource, setCropperSource ] = useState<Blob | null>(null);

	const dialogOpenHandler = () => {
		setDialogOpen(true);
	};
	const dialogCloseHandler = () => {
		setDialogOpen(false);
	};
	const selectHandler = (image: Blob | string) => {
		setSourceTmp(image);
	};
	const confirmHandler = () => {
		setSource(sourceTmp as Blob);
		onChange(sourceTmp as string);
		dialogCloseHandler();
	};

	return (
		<>
			<ImageWrapper>
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
							onClick={dialogOpenHandler}
							size="medium"
							sx={{
								backgroundColor: (theme) => theme.palette.background.default,
								color: (theme) => theme.palette.text.primary,
								opacity: 0,
								'&:hover': {
									backgroundColor: (theme) => theme.palette.background.default,
									color: (theme) => theme.palette.text.primary,
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
							onClick={dialogOpenHandler}
						>
							<AddPhotoAlternateIcon
								fontSize="medium"
							/>
						</IconButton>
					)}
				</Stack>
				{source && (
					<Image
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
			</ImageWrapper>
			<Dialog
				open={dialogOpen}
				onClose={dialogCloseHandler}
				title="Select your avatar image"
				showBodyClose
				showFooterClose
				actions={
					<>
						<Button
							onClick={() => {
								setCropperSource(null);
							}}
							disabled={!cropperSource}
						>
							Cancel
						</Button>
						<Button
							onClick={confirmHandler}
						>
							Update
						</Button>
					</>
				}
			>
				<>
					<div>
						<Stack
							direction="row"
							spacing={2}
							alignItems="flex-start"
							justifyContent="flex-start"
							sx={{
								mb: 3,
							}}
						>
							<ImageWrapper
								sx={{
									backgroundColor: 'rgba(0,0,0,.05)',
								}}
							>
								{sourceTmp ? (
									<Image
										src={sourceTmp as string}
										alt="img"
										style={{
											maxWidth: '100%',
											height: 'auto',
										}}
									/>
								) : (
									<QuestionMarkIcon />
								)}
							</ImageWrapper>
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
								<ImageWrapper
									sx={{
										width: '100px',
										height: '100px',
										borderRadius: '4px',
										cursor: 'pointer',
									}}
									selected={temporarySource === sourceTmp}
									onClick={() => selectHandler(temporarySource)}
								>
									<Image
										src={String(temporarySource)}
										alt="default"
										style={{
											maxWidth: '100%',
											height: 'auto',
										}}
									/>
								</ImageWrapper>
							)}
							{staticAvatarList.map((item, index) => {
								if (item !== String(temporarySource)) return (
									<ImageWrapper
										key={item}
										sx={{
											width: '100px',
											height: '100px',
											borderRadius: '4px',
											cursor: 'pointer',
										}}
										selected={item === sourceTmp}
										onClick={() => selectHandler(item)}
									>
										<Image
											src={item}
											alt={`default_${index}`}
											style={{
												maxWidth: '100%',
												height: 'auto',
											}}
										/>
									</ImageWrapper>
								);
							})}
							{sourceTmp && (
								<ImageWrapper
									sx={{
										width: '100px',
										height: '100px',
										borderRadius: '4px',
										cursor: 'pointer',
									}}
									onClick={() => selectHandler('')}
								>
									<RemoveCircleOutlineIcon />
								</ImageWrapper>
							)}
						</Stack>
					</div>
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
				</>
			</Dialog>
		</>
	);
};

export default AvatarPicker;
