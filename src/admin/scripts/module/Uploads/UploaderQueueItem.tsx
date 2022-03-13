import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
	Stack,
	Typography,
	Divider,
	Box,
} from '@mui/material';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import ArticleIcon from '@mui/icons-material/Article';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

import { file as fileUtils } from '../../../../../utils/helpers';
import { UPLOAD_IMAGE_LIMIT, UPLOAD_FILE_LIMIT } from '../../constants';
import { uploadItemTemporaryType } from '../../types/uploader';
import { UploadsItemProps } from '../../types/model';
import {
	Card,
	Button,
	ControlledForm,
	ControlledFormRow,
	Section,
	Input,
	Textarea,
	LanguageFieldset,
	Chip,
	ChipProps,
} from '../../component/ui';
import ImageCropper from '../../component/ImageCropper';

type combinedUploadsItemProps = uploadItemTemporaryType & UploadsItemProps;
export interface UploaderQueueItemProps {
	data: combinedUploadsItemProps;
	onRemove: (id: string) => void;
	onChange?: (item: combinedUploadsItemProps) => void;
	onCropImageUpdate?: (item: any, blob: Blob | string | null) => void;
}

const UploaderQueueItem = (props: UploaderQueueItemProps) => {
	const {
		data,
		onRemove,
		onChange,
		onCropImageUpdate,
	} = props;

	const { t } = useTranslation([ 'common', 'form', 'components' ]);

	const getSizeColor = () => {
		let color = 'info';
		if (data.file_type === 'image') {
			if (data.file_size >= (UPLOAD_IMAGE_LIMIT / 1.5)) color = 'warning';
		} else {
			if (data.file_size >= (UPLOAD_FILE_LIMIT / 1.5)) color = 'warning';
		}

		return color as ChipProps['color'];
	};
	const formChangeHandler = (fields) => onChange(fields);

	return (
		<Card
			id={data.tmp_id}
			title={data.file_name}
			collapsible
			collapse
			actionsDivider
			cardContentProps={{
				sx: [
					{
						'&:last-child': {
							pb: 0,
						},
					},
				],
			}}
			actionsNode={
				<Stack
					direction="row"
					alignItems="center"
					justifyContent="space-between"
					sx={{
						width: '100%',
					}}
				>
					<Stack
						direction="row"
						alignItems="center"
						justifyContent="space-between"
						spacing={1}
						sx={{
							px: 1,
						}}
					>
						<Chip
							label={fileUtils.formatBytes(data.file_size)}
							color={getSizeColor()}
							variant="outlined"
						/>
						<Chip
							label={data.file_mime}
							variant="outlined"
						/>
					</Stack>
					<Stack
						direction="row"
						alignItems="center"
						justifyContent="space-between"
						spacing={2}
					>
						<Button
							color="warning"
							onClick={() => onRemove(data.tmp_id)}
						>
							{t('btn.remove')}
						</Button>
					</Stack>
				</Stack>
			}
		>
			<ControlledForm
				dataId="UploaderQueueItemForm"
				defaultValues={data}
				onChange={formChangeHandler}
				renderMain={(form) => {
					const { token, form: {
						control,
						setValue,
						watch,
					} } = form;
					const watchCroppedImage = watch('fileBase64_cropped');

					return (
						<>
							{data.file_type === 'image' ? (
								<ImageCropper
									source={data.fileBase64}
									onConfirm={(blob) => {
										setValue('fileBase64_cropped', blob as string);
										onCropImageUpdate(watch(), blob);
									}}
								/>
							) : (
								<Box
									sx={{
										width: '100%',
										mb: 2,
										p: 4,
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										flexDirection: 'column',
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
										}[ data.file_type ]
									}
									<Typography
										variant="caption"
									>
										{data.file_name}
									</Typography>
								</Box>
							)}
							<Divider
								sx={{
									mt: 3,
									mb: 4,
								}}
							/>
							<Section
								style={{
									marginBottom: '.5rem',
								}}
								noSpacing
							>
								<ControlledFormRow
									name="name"
									control={control}
									rules={{ required: true }}
									defaultValue={''}
									render={({ field, fieldState }) => {
										const { ref, ...rest } = field;
										const { error } = fieldState;

										return (
											<Input
												label={t('form:label.name')}
												placeholder={t('form:placeholder.name')}
												id={`${token}_name`}
												error={!!error}
												required
												inputRef={ref}
												{...rest}
											/>
										);
									}}
								/>
							</Section>
							<LanguageFieldset
								render={(lang) => (
									<>
										<ControlledFormRow
											name={`lang.${lang}.label`}
											control={control}
											rules={{}}
											defaultValue={''}
											render={({ field, fieldState }) => {
												const { ref, ...rest } = field;
												const { error } = fieldState;

												return (
													<Input
														label={t('form:label.label')}
														placeholder={t('form:placeholder.label')}
														id={`${token}_${lang}_label`}
														error={!!error}
														inputRef={ref}
														{...rest}
													/>
												);
											}}
										/>
										<ControlledFormRow
											name={`lang.${lang}.description`}
											control={control}
											rules={{}}
											defaultValue={''}
											render={({ field, fieldState }) => {
												const { ref, ...rest } = field;
												const { error } = fieldState;

												return (
													<Textarea
														label={t('form:label.description')}
														placeholder={t('form:placeholder.description')}
														id={`${token}_${lang}_description`}
														error={!!error}
														inputRef={ref}
														rows={4}
														{...rest}
													/>
												);
											}}
										/>
									</>
								)}
							/>
							{watchCroppedImage && (
								<Section>
									<Chip
										label={t('components:UploaderQueueItem.label.reset_cropped_image')}
										color="warning"
										variant="outlined"
										onDelete={() => {
											setValue('fileBase64_cropped', null);
											onCropImageUpdate(watch(), null);
										}}
									/>
								</Section>
							)}
						</>
					);
				}}
			/>
		</Card>
	);
};

export default UploaderQueueItem;
