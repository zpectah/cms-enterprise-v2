import React from 'react';
import {
	styled,
	Box,
	BoxProps,
} from '@mui/material';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import ArticleIcon from '@mui/icons-material/Article';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

export interface ThumbnailViewProps {
	name: string;
	fileType: string;
	fileName: string;
	boxProps?: BoxProps;
}

const StyledWrapper = styled(Box)`
	width: 100%;
	height: auto;
	min-height: 200px;
	max-height: 50vh;
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: rgba(150,150,150,.125);
	border-radius: .5rem;
`;
const Image = styled('img')`
	max-width: 100%;
	height: auto;
	max-height: 40vh;
`;

const ThumbnailView = (props: ThumbnailViewProps) => {
	const {
		name,
		fileType = 'undefined',
		fileName,
		boxProps,
	} = props;

	const imageSourcePath = `/uploads/${fileType}/large/${fileName}`;
	// const fileSourcePath = `/uploads/${fileType}/${fileName}`;

	return (
		<StyledWrapper
			sx={{
				p: {
					xs: 2,
					sm: 3,
					md: 4,
				},
				mb: 4,
			}}
			{...boxProps}
		>
			{
				{
					'image': (
						<Image
							src={imageSourcePath}
							alt={name}
						/>
					),
					'audio': (
						<AudiotrackIcon fontSize="large" />
					),
					'video': (
						<OndemandVideoIcon fontSize="large" />
					),
					'document': (
						<ArticleIcon fontSize="large" />
					),
					'archive': (
						<AttachFileIcon fontSize="large" />
					),
					'undefined': (
						<QuestionMarkIcon fontSize="large" />
					),
				}[ fileType ]
			}
		</StyledWrapper>
	);
};

export default ThumbnailView;
