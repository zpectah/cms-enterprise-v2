import React from 'react';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';
import { Box, Stack } from '@mui/material';

import { CommentsItemProps } from '../../../types/model';
import {
	Dialog,
	ControlledForm,
	ControlledFormRow,
	Input,
	Textarea,
	Section,
	Button,
	PrimaryButton,
	BlockPreloader,
} from '../../../component/ui';

export interface CommentsDetailProps {
	detailData?: CommentsItemProps;
	onSubmit: (master: CommentsItemProps) => Promise<unknown>;
	open: boolean;
	onClose: () => void;
	model: 'Posts' | 'Categories';
	modelId: number;
	userEmail: string;
}

const CommentsDetail = (props: CommentsDetailProps) => {
	const {
		detailData,
		onSubmit,
		open,
		onClose,
		model,
		modelId,
		userEmail,
	} = props;

	const { t } = useTranslation([ 'common', 'form' ]);

	const submitHandler = (data: CommentsItemProps) => {
		const master = _.cloneDeep(data);
		master.email = detailData.id === 'new' ? userEmail : data.email;
		master.assigned = model;
		master.assigned_id = modelId;
		onSubmit(master).then(() => {
			onClose();
		});
	};

	return (
		<Dialog
			open={open}
			onClose={onClose}
		>
			{detailData ? (
				<ControlledForm
					dataId="CommentsDetailForm"
					defaultValues={detailData}
					onSubmit={submitHandler}
					renderActions={() => (
						<Stack
							direction="row"
							spacing={2}
						>
							<PrimaryButton
								type="submit"
							>
								{t(detailData.id === 'new' ? 'btn.create' : 'btn.update')}
							</PrimaryButton>
							<Button
								onClick={onClose}
							>
								{t('btn.cancel')}
							</Button>
						</Stack>
					)}
					renderMain={(form) => {
						const { token, form: { control, register } } = form;

						return (
							<Box
								sx={{ pt: 1 }}
							>
								<input type="hidden" {...register('id')} />
								<Section noSpacing>
									<ControlledFormRow
										name="title"
										control={control}
										rules={{ required: true }}
										defaultValue={detailData.title}
										render={({ field, fieldState }) => {
											const { ref, ...rest } = field;
											const { error } = fieldState;

											return (
												<Input
													label={t('form:label.title')}
													placeholder={t('form:placeholder.title')}
													id={`${token}_title`}
													error={!!error}
													required
													inputRef={ref}
													{...rest}
												/>
											);
										}}
									/>
									<ControlledFormRow
										name="content"
										control={control}
										rules={{ required: true }}
										defaultValue={detailData.content}
										render={({ field, fieldState }) => {
											const { ref, ...rest } = field;
											const { error } = fieldState;

											return (
												<Textarea
													label={t('form:label.content')}
													placeholder={t('form:placeholder.content')}
													id={`${token}_content`}
													error={!!error}
													required
													inputRef={ref}
													rows={6}
													{...rest}
												/>
											);
										}}
									/>
								</Section>
							</Box>
						);
					}}
				/>
			) : (
				<BlockPreloader />
			)}
		</Dialog>
	);
};

export default CommentsDetail;
