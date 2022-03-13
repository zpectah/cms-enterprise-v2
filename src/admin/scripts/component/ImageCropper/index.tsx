import React, { useCallback, useEffect, useState } from 'react';
import ReactCrop, { Crop } from 'react-image-crop';
import { useTranslation } from 'react-i18next';
import { Box, Stack } from '@mui/material';
import 'react-image-crop/dist/ReactCrop.css';

import { UPLOAD_IMAGE_CROP_OPTIONS } from '../../constants';
import {
	BarPreloader,
	TextPreloader,
	Toggle,
	Button,
} from '../ui';
import { getCroppedImage } from '../../utils/image';

export interface ImageCropperProps {
	source?: Blob;
	onConfirm?: (blob: Blob | string) => void;
	minImgSize?: number;
}

const ImageCropper = (props: ImageCropperProps) => {
	const {
		source,
		onConfirm,
		minImgSize = 150,
	} = props;

	const { t } = useTranslation([ 'common' ]);
	const [ originalAspect, setOriginalAspect ] = useState(16 / 9);
	const [ crop, setCrop ] = useState<Crop>({
		aspect: 16 / 9,
		x: 0,
		y: 0,
		width: 0,
		height: 0,
		unit: 'px',
	});
	const [ croppedImage, setCroppedImage ] = useState<Blob | string | null>(null);
	const [ aspectOptions, setAspectOptions ] = useState([]);
	const [ processing, setProcessing ] = useState(false);

	const getAspectOptions = (originalAspect?: number) => {
		let array = [];
		if (originalAspect) {
			array.push({
				key: 'original',
				value: originalAspect,
				children: <>original</>,
				size: 'small',
				onClick: () => {
					setCrop({
						...crop,
						aspect: originalAspect,
					});
				},
			});
		}
		UPLOAD_IMAGE_CROP_OPTIONS.map((item) => {
			array.push({
				key: item.label,
				value: item.value,
				children: <>{item.label}</>,
				size: 'small',
				onClick: () => {
					setCrop({
						...crop,
						aspect: item.value,
					});
				},
			});
		});

		return array;
	};
	const resetHandler = () => {
		setCroppedImage(null);
		setCrop({
			aspect: originalAspect,
			x: 0,
			y: 0,
			width: 0,
			height: 0,
			unit: 'px',
		});
	};
	const imageLoadHandler = (image: HTMLImageElement) => {
		const aspect = (image.width / image.height);
		setCrop({
			...crop,
			// Uncomment in case of set auto crop
			// width: image.width,
			// height: image.height,
			aspect: aspect,
		});
		setOriginalAspect(aspect);
		setAspectOptions(getAspectOptions(aspect));

		return false;
	};
	const changeHandler = (crop: Crop) => {
		setCrop(crop);
	};
	const completeHandler = (crop: Crop) => {
		setProcessing(true);

		return getCroppedImage(
			source,
			{
				width: crop.width,
				height: crop.height,
				x: crop.x,
				y: crop.y,
			},
			0
		).then((resp) => {
			setCroppedImage(resp);
			setProcessing(false);
		});
	};
	const confirmHandler = () => {
		if (onConfirm) onConfirm(croppedImage);
		resetHandler();
	};

	return (
		<>
			{processing && <BarPreloader />}
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				{source ? (
					<ReactCrop
						src={String(source)}
						crop={crop}
						onImageLoaded={imageLoadHandler}
						onChange={changeHandler}
						onComplete={completeHandler}
						minWidth={minImgSize}
						minHeight={minImgSize}
					/>
				) : (
					<TextPreloader />
				)}
			</Box>
			<Box
				sx={{
					pt: 2,
				}}
			>
				<Stack
					direction="row"
					spacing={2}
					alignItems="center"
					justifyContent="center"
				>

					<Toggle
						items={aspectOptions}
						value={crop.aspect}
						size="small"
					/>

				</Stack>
			</Box>
			<Box
				sx={{
					pt: 2,
				}}
			>
				<Stack
					direction="row"
					spacing={2}
					alignItems="center"
					justifyContent="center"
				>

					<Button
						onClick={resetHandler}
						disabled={!croppedImage}
						color="warning"
					>
						{t('btn.reset')}
					</Button>

					<Button
						onClick={confirmHandler}
						disabled={!croppedImage}
						variant="outlined"
					>
						{t('btn.confirm')}
					</Button>

				</Stack>
			</Box>
		</>
	);
};

export default ImageCropper;
