import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';

import config from '../../config';
import routes from '../../routes';
import { MessagesItemProps } from '../../types/model';
import { submitMethodProps, entityActionsType } from '../../types/common';
import PageHeading from '../../component/PageHeading';
import {
	ConfirmDialog,
	ControlledDetailFormLayout,
	Section,
	Input,
	Select,
	BlockPreloader,
	BarPreloader,
	ControlledFormRow,
	Textarea,
	Chip,
} from '../../component/ui';
import {
	getDetailData,
	getOptionsList,
} from '../../utils';
import InfoMetaBlock from '../../component/InfoMetaBlock';

interface MessagesDetailProps {
	dataItems: MessagesItemProps[];
	onSubmit: (method: submitMethodProps, master: MessagesItemProps) => Promise<unknown>;
	onDelete: (master: number[]) => Promise<unknown>;
	loading: boolean;
	actions: entityActionsType;
}

const MessagesDetail = (props: MessagesDetailProps) => {
	const {
		dataItems = [],
		onSubmit,
		onDelete,
		loading,
		actions,
	} = props;

	const { t } = useTranslation([ 'common', 'form', 'types' ]);
	const params = useParams();
	const navigate = useNavigate();
	const [ detailData, setDetailData ] = useState<MessagesItemProps>(null);
	const [ confirmOpen, setConfirmOpen ] = useState<boolean>(false);
	const [ confirmData, setConfirmData ] = useState<(string | number)[]>([]);
	const [ submitting, setSubmitting ] = useState(false);

	const detailOptions = {
		root: `/admin/app/${routes.messages.path}`,
	};

	const submitHandler = (data: MessagesItemProps) => {
		setSubmitting(true);
		const master = _.cloneDeep(data);
		const method: submitMethodProps = master.id == 'new' ? 'create' : 'update';
		onSubmit(method, master).then(() => {
			setSubmitting(false);
			navigate(detailOptions.root);
		});
	};
	const deleteHandler = (id: string | number) => {
		setConfirmOpen(true);
		setConfirmData([id]);
	};
	const deleteConfirmHandler = () => {
		const master = _.cloneDeep(confirmData);
		onDelete(master).then((resp) => {
			setConfirmOpen(false);
			setConfirmData([]);
		});
	};
	const closeConfirmHandler = () => {
		setConfirmOpen(false);
		setConfirmData([]);
	};

	useEffect(() => setDetailData(getDetailData('Messages', dataItems, params.id)), [ dataItems, params ]);

	const getOptionsType = useCallback(
		() => getOptionsList(config.options.model.Messages.type, t),
		[ detailData ],
	);

	return (
		<>
			<PageHeading
				title={detailData?.id === 'new' ? t('model_new.Messages') : detailData?.sender}
				returnTo={detailOptions.root}
				createButtonLabel={t('model_new.Messages')}
				createButtonPath={`${detailOptions.root}/detail/new`}
			/>
			{loading && <BarPreloader />}
			{detailData ? (
				<ControlledDetailFormLayout
					mandatoryInfo
					dataId="MessagesDetailForm"
					actions={{
						update: actions.update,
						create: actions.create,
						delete: actions.delete,
					}}
					detailId={detailData.id}
					defaultValues={detailData}
					onSubmit={submitHandler}
					submitting={submitting}
					onDelete={() => deleteHandler(detailData.id)}
					renderSidebar={() => (
						<InfoMetaBlock
							list={{
								'status': <Chip label={String(detailData.status)} size="small" />,
								'created': detailData.created ? detailData.created : 'N/A',
							}}
						/>
					)}
					renderPrimary={(form) => {
						const { token, form: {
							control,
							register,
						} } = form;

						return (
							<>
								<div>
									<input type="hidden" {...register('id')} />
									<Section>
										<ControlledFormRow
											name="type"
											control={control}
											rules={{ required: true }}
											defaultValue={detailData.type}
											render={({ field, fieldState }) => {
												const { ref, ...rest } = field;
												const { error } = fieldState;

												return (
													<Select
														label={t('form:label.type')}
														placeholder={t('form:placeholder.type')}
														id={`${token}_type`}
														error={!!error}
														required
														inputRef={ref}
														options={getOptionsType()}
														sx={{ width: { xs: '100%', md: '250px' } }}
														{...rest}
													/>
												);
											}}
										/>
										<ControlledFormRow
											name="sender"
											control={control}
											rules={{ required: true }}
											defaultValue={detailData.sender}
											render={({ field, fieldState }) => {
												const { ref, ...rest } = field;
												const { error } = fieldState;

												return (
													<Input
														label={t('form:label.sender')}
														placeholder={t('form:placeholder.sender')}
														id={`${token}_sender`}
														error={!!error}
														required
														inputRef={ref}
														sx={{ width: { xs: '100%', md: '75%' } }}
														{...rest}
													/>
												);
											}}
										/>
										<ControlledFormRow
											name="recipients"
											control={control}
											rules={{ required: true }}
											defaultValue={detailData.recipients}
											render={({ field, fieldState }) => {
												const { ref, ...rest } = field;
												const { error } = fieldState;

												return (
													<Input
														label={t('form:label.recipients')}
														placeholder={t('form:placeholder.recipients')}
														id={`${token}_recipients`}
														error={!!error}
														required
														inputRef={ref}
														sx={{ width: { xs: '100%', md: '75%' } }}
														{...rest}
													/>
												);
											}}
										/>
									</Section>
									<Section>
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
														sx={{ width: { xs: '100%', md: '75%' } }}
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
														rows={7}
														{...rest}
													/>
												);
											}}
										/>
									</Section>
								</div>
							</>
						);
					}}
				/>
			) : (
				<BlockPreloader />
			)}
			<ConfirmDialog
				context="delete"
				open={confirmOpen}
				confirmData={confirmData}
				onConfirm={deleteConfirmHandler}
				onClose={closeConfirmHandler}
			/>
		</>
	);
};

export default MessagesDetail;
