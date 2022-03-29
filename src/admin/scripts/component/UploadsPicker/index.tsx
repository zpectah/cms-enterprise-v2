import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
	Box,
	ImageList,
	ImageListItem,
	ImageListItemBar,
	styled,
	Typography,
	Alert,
} from '@mui/material';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import ArticleIcon from '@mui/icons-material/Article';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import CheckIcon from '@mui/icons-material/Check';

import config from '../../config';
import palette from '../../styles/palette';
import { useUploads } from '../../hooks/model';
import { UploadsItemProps } from '../../types/model';
import { Dialog, PrimaryButton, Image } from '../ui';

type uploaderValueType = string | number | (number | string)[];
type selectedItemType = {
	id: number,
	type: string,
	fileName: string,
};
export interface UploadsPickerProps {
	variant: 'attachments' | 'media' | 'thumbnail',
	initialValue?: uploaderValueType;
	onChange?: (value: uploaderValueType) => void;
	buttonLabel?: string;
	required?: boolean;
}

const StyledImageItem = styled(ImageListItem)`
	position: relative;
	cursor: pointer;
`;
const StyledImg = styled(Image)`
	max-width: 100%;
	height: auto;
	max-height: 200px;
	margin: 0;
	border-radius: .35rem;
`;
const SelectedItemCorner = styled('div')(({theme}) => (`
	width: 30px;
	height: 30px;
	display: flex;
	align-items: center;
	justify-content: center;
	position: absolute;
	top: 0;
	right: 0;
	color: ${palette.light};
	
	&: before{
		content: '';
		width: 0;
		height: 0;
		border-left: 30px solid transparent;
		border-right: 30px solid transparent;
		border-bottom: 30px solid ${theme.palette.success.main};
		position: absolute;
		top: 0;
		left: 0;
		transform: rotate(-315deg);
    transform-origin: top;
	}
`));
const StyledThumbnail = styled(StyledImg)`
	max-height: 100px;
`;

const UploadsPicker = (props: UploadsPickerProps) => {
	const {
		variant,
		initialValue,
		onChange,
		buttonLabel = 'Select uploads',
		required,
	} = props;

	const multiple = variant === 'attachments';
	const labelButton = `${buttonLabel}${required ? ' *' : ''}`;

	const { t } = useTranslation([ 'common' ]);
	const [ selected, setSelected ] = useState<selectedItemType[]>([]);
	const [ isOpen, setIsOpen ] = useState<boolean>(false);
	const {
		uploads,
		uploads_loading,
	} = useUploads();

	const openHandler = () => {
		setIsOpen(true);
	};
	const closeHandler = () => {
		setIsOpen(false);
	};
	const toggleHandler = (id, type, fileName) => {
		let tmp = [ ...selected ];
		const item = tmp.find((item) => item.id === id);
		const index = tmp.indexOf(item);
		if (index > -1) {
			tmp.splice(index, 1);
		} else {
			if (!multiple) tmp = [];
			tmp.push({
				id,
				type,
				fileName,
			});
		}
		setSelected(tmp);
		if (onChange) setSelectedValue(tmp);
	};
	const setSelectedValue = (selected: selectedItemType[]) => {
		let tmp;
		if (selected.length > 0) {
			if (variant === 'attachments') {
				tmp = [];
				selected.map((sel) => {
					tmp.push(sel.id);
				});
			}
			if (variant === 'media') {
				tmp = selected[0].id;
			}
			if (variant === 'thumbnail') {
				tmp = selected[0].fileName;
			}
		}
		onChange(tmp);
	};
	const setInitialSelected = () => {
		const tmp = [];
		if (variant === 'attachments' && Array.isArray(initialValue)) {
			uploads?.map((upload) => {
				initialValue.map((item) => {
					if (upload.id === item) {
						tmp.push({
							id: upload.id,
							type: upload.type,
							fileName: upload.file_name,
						});
					}
				})
			});
		}
		if (variant === 'media') {
			const item = uploads?.find((upload) => upload.id === initialValue);
			if (item) {
				tmp.push({
					id: item.id,
					type: item.type,
					fileName: item.file_name,
				});
			}
		}
		if (variant === 'thumbnail') {
			const item = uploads?.find((upload) => upload.file_name === initialValue);
			if (item) {
				tmp.push({
					id: item.id,
					type: item.type,
					fileName: item.file_name,
				});
			}
		}
		setSelected(tmp);
	};

	const isSelected = useCallback((id) => {
		const item = selected.find((item) => item.id === id);
		const index = selected.indexOf(item);

		return index > -1;
	}, [ selected, uploads ]);

	useEffect(() => {
		if (uploads?.length > 0 && initialValue) setInitialSelected();

		return () => {};
	}, [ uploads, initialValue ]);

	const renderDefaultTrigger = () => (
		<PrimaryButton
			variant="outlined"
			onClick={() => openHandler()}
			sx={{ marginBottom: '1rem' }}
		>
			{labelButton}
		</PrimaryButton>
	);
	const renderDialogUploadItemImage = (upload: UploadsItemProps) => {
		if (upload.type === 'image') {
			return (
				<StyledImg
					src={`${config.environmental.root}uploads/image/small/${upload.file_name}`}
					alt={upload.name}
					loading="lazy"
				/>
			);
		}

		return (
			<Box
				sx={{
					width: '100%',
					height: '100%',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					backgroundColor: 'rgba(200,200,200,.5)',
					borderRadius: '.35rem',
				}}
			>
				{
					{
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
					}[upload.type]
				}
			</Box>
		);
	};
	const renderSelectedItemImage = (item: selectedItemType) => {
		if (item.type === 'image') {
			return (
				<StyledThumbnail
					src={`${config.environmental.root}uploads/image/thumbnail/${item.fileName}`}
					alt={item.fileName}
					loading="lazy"
				/>
			);
		}

		return (
			<Box
				sx={{
					width: '100px',
					height: '100px',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					flexDirection: 'column',
					backgroundColor: 'rgba(200,200,200,.5)',
					position: 'relative',
					overflow: 'hidden',
					borderRadius: '.35rem',
				}}
			>
				{
					{
						'audio': (
							<AudiotrackIcon />
						),
						'video': (
							<OndemandVideoIcon />
						),
						'document': (
							<ArticleIcon />
						),
						'archive': (
							<AttachFileIcon />
						),
						'undefined': (
							<QuestionMarkIcon />
						),
					}[item.type]
				}
				<small>
					{item.fileName}
				</small>
			</Box>
		);
	};
	const renderSelectedThumbnail = (item: selectedItemType) => {
		const clickHandler = (e) => {
			e.preventDefault();
			if (variant === 'thumbnail') openHandler();
		};

		if (item) return (
			<Box
				sx={{
					width: '100%',
					cursor: variant === 'thumbnail' ? 'pointer' : 'default',
				}}
				onClick={clickHandler}
			>
				<StyledThumbnail
					src={`${config.environmental.root}uploads/image/small/${item.fileName}`}
					alt={item.fileName}
					loading="lazy"
					sx={{ maxHeight: 'initial' }}
				/>
			</Box>
		);

		if (variant === 'media') {
			return (
				<Alert
					severity="info"
					sx={{
						mt: 1,
					}}
				>
					{t('label.no_selected')}
				</Alert>
			);
		} else {
			return renderDefaultTrigger();
		}
	};

	return (
		<>
			{variant === 'attachments' ? (
				<div>
					{renderDefaultTrigger()}
					<Box
						sx={{
							display: 'flex',
							alignItems: 'flex-start',
							justifyContent: 'flex-start',
							flexDirection: 'row',
							flexWrap: 'wrap',
						}}
					>
						{selected?.map((sel) => (
							<div
								key={sel.id}
							>
								{renderSelectedItemImage(sel)}
							</div>
						))}
					</Box>
				</div>
			) : (
				<div>
					{variant === 'media' && renderDefaultTrigger()}
					{renderSelectedThumbnail(selected[0])}
				</div>
			)}
			<Dialog
				open={isOpen}
				onClose={closeHandler}
				showBodyClose
			>
				<div>
					{uploads_loading ? (
						<>loading</>
					) : (
						<ImageList
							cols={4}
						>
							{uploads?.map((upload) => {
								const selected = isSelected(upload.id);
								const onlyImage = variant === 'media' || variant === 'thumbnail';

								if (onlyImage && upload.type !== 'image') return false;

								return (
									<StyledImageItem
										key={upload.id}
										onClick={() => toggleHandler(
											upload.id,
											upload.type,
											upload.file_name,
										)}
									>
										{selected && (
											<SelectedItemCorner>
												<CheckIcon
													fontSize="small"
													sx={{
														fontSize: 'small',
														zIndex: 1,
														position: 'relative',
														top: '-3px',
														right: '-3px',
													}}
												/>
											</SelectedItemCorner>
										)}
										{renderDialogUploadItemImage(upload)}
										<ImageListItemBar
											title={upload.name}
										/>
									</StyledImageItem>
								);
							})}
						</ImageList>
					)}
				</div>
			</Dialog>
		</>
	);
};

export default UploadsPicker;
