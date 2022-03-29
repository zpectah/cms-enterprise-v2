import React from 'react';
import { styled } from '@mui/material';

const StyledAudio = styled('audio')`
	max-width: 100%;
	height: auto;
	min-height: 50px;	
	max-height: 100%;
`;
const StyledSource = styled('source')``;

export interface AudioProps {
	src: string;
	controls?: boolean;
}

const Audio = (props: AudioProps) => {
	const {
		src,
		controls,
	} = props;

	const type = src.split('.').pop().toLowerCase();
	const name = src.split('.').slice(0, -1).join('.');

	return (
		<StyledAudio
			controls={controls}
		>
			<StyledSource
				key={src}
				src={src}
				type={`audio/${type}`}
				aria-label={name}
			/>
			Your browser does not support HTML audio
		</StyledAudio>
	);
};

export default Audio;
