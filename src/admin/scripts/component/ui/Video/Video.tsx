import React from 'react';
import { styled } from '@mui/material';

const StyledVideo = styled('video')`
	max-width: 100%;
	height: auto;
	max-height: 100%;
`;
const StyledSource = styled('source')``;

export interface VideoProps {
	src: string;
	controls?: boolean;
}

const Video = (props: VideoProps) => {
	const {
		src,
		controls,
	} = props;

	const type = src.split('.').pop().toLowerCase();
	const name = src.split('.').slice(0, -1).join('.');

	return (
		<StyledVideo
			controls={controls}
		>
			<StyledSource
				key={src}
				src={src}
				type={`video/${type}`}
				aria-label={name}
			/>
			Your browser does not support HTML video
		</StyledVideo>
	);
};

export default Video;
