import React from 'react';

export interface ImageCropperProps {
	source?: Blob;
	onConfirm?: (blob: Blob) => void;
}

const ImageCropper = (props: ImageCropperProps) => {
	const {
		source,
		onConfirm,
	} = props;

	return (
		<div>
			ImageCropper
			<br />
			{source && (
				<img
					src={String(source)}
					alt="image"
					style={{
						maxWidth: '100%',
						height: 'auto',
					}}
				/>
			)}
		</div>
	);
};

export default ImageCropper;
