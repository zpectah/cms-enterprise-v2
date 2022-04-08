import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';
import { Typography, Stack } from '@mui/material';

import config from '../../config';
import routes from '../../routes';
import { MessagesItemProps } from '../../types/model';
import { submitMethodProps, entityActionsType } from '../../types/common';
import useSettings from '../../hooks/useSettings';
import { useUsers, useMembers } from '../../hooks/model';
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
	const { settings } = useSettings();
	const { users } = useUsers();
	const { members } = useMembers();
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

	const editable = useMemo(() => {
		return detailData?.id === 'new';
	}, [ detailData ]);
	const options_type = useMemo(() => getOptionsList(config.options.model.Messages.type, t), [ detailData ]);
	const options_sender = useMemo(() => {
		const list = [];
		if (settings?.form_email_sender) list.push({
			key: settings?.form_email_sender,
			value: settings?.form_email_sender,
			label: settings?.form_email_sender,
		});
		if (users) {
			users?.map((user) => {
				list.push({
					key: user.id,
					value: user.email,
					label: user.email,
				});
			});
		}

		return list;
	}, [ settings, users ]);
	const options_recipients = useMemo(() => {
		const list = [];
		if (members) {
			members?.map((user) => {
				list.push({
					key: user.id,
					value: user.email,
					label: user.email,
				});
			});
		}

		return list;
	}, [ settings, members ]);

	return (
		<>
			<PageHeading
				title={detailData?.id === 'new' ? t('model_new.Messages') : detailData?.subject}
				returnTo={detailOptions.root}
				createButtonLabel={t('model_new.Messages')}
				createButtonPath={`${detailOptions.root}/detail/new`}
			/>
			{loading && <BarPreloader />}
			{detailData ? (
				<ControlledDetailFormLayout
					mandatoryInfo={editable}
					dataId="MessagesDetailForm"
					actions={{
						update: actions.update,
						create: actions.create,
						delete: actions.delete,
					}}
					editable={editable}
					detailId={detailData?.id}
					defaultValues={detailData}
					onSubmit={submitHandler}
					submitting={submitting}
					onDelete={() => deleteHandler(detailData?.id)}
					renderSidebar={() => (
						<InfoMetaBlock
							list={{
								'created': detailData?.created ? (
									<small>{detailData?.created}</small>
								) : 'N/A',
								'ipAddress': (
									<small>{detailData?.ip_address}</small>
								),
								'status': <Chip label={String(detailData?.status)} size="small" />,
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
													<>
														{detailData?.id === 'new' ? (
															<Select
																label={t('form:label.type')}
																placeholder={t('form:placeholder.type')}
																id={`${token}_type`}
																error={!!error}
																required
																inputRef={ref}
																options={options_type}
																sx={{ width: { xs: '100%', md: '250px' } }}
																disabled={true} // TODO
																{...rest}
															/>
														) : (
															<Typography>
																{t('form:label.type')}: <b>{field.value}</b>
															</Typography>
														)}
													</>
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
													<>
														{detailData?.id === 'new' ? (
															<Select
																label={t('form:label.sender')}
																placeholder={t('form:placeholder.sender')}
																id={`${token}_sender`}
																error={!!error}
																required
																inputRef={ref}
																options={options_sender}
																sx={{ width: { xs: '100%', md: '50%' } }}
																readOnly={!editable}
																{...rest}
															/>
														) : (
															<Typography>
																{t('form:label.sender')}: <b>{field.value}</b>
															</Typography>
														)}
													</>
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
													<>
														{detailData?.id === 'new' ? (
															<Select
																label={t('form:label.recipients')}
																placeholder={t('form:placeholder.recipients')}
																id={`${token}_recipients`}
																error={!!error}
																required
																inputRef={ref}
																options={options_recipients}
																sx={{ width: { xs: '100%', md: '75%' } }}
																readOnly={!editable}
																multiple
																{...rest}
															/>
														) : (
															<Stack
																direction="row"
																spacing={1}
															>
																<Typography>
																	{t('form:label.recipients')}:
																</Typography>
																{field.value.map((val) => (
																	<Chip
																		key={val}
																		label={val}
																		size="small"
																	/>
																))}
															</Stack>
														)}
													</>
												);
											}}
										/>
									</Section>
									<Section>
										<ControlledFormRow
											name="subject"
											control={control}
											rules={{ required: true }}
											defaultValue={detailData.subject}
											render={({ field, fieldState }) => {
												const { ref, ...rest } = field;
												const { error } = fieldState;

												return (
													<Input
														label={t('form:label.subject')}
														placeholder={t('form:placeholder.subject')}
														id={`${token}_subject`}
														error={!!error}
														required
														inputRef={ref}
														sx={{ width: { xs: '100%', md: '75%' } }}
														InputProps={{
															readOnly: !editable,
														}}
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
														InputProps={{
															readOnly: !editable,
														}}
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
