import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';

import config from '../../config';
import routes from '../../routes';
import {
	EMAIL_REGEX,
	USER_LEVEL_KEYS,
} from '../../constants';
import { UsersItemProps } from '../../types/model';
import { submitMethodProps } from '../../types/common';
import getDetailData from '../../utils/getDetailData';
import PageHeading from '../../component/PageHeading';
import {
	ConfirmDialog,
	ControlledDetailFormLayout,
	Section,
	Input,
	PasswordInput,
	Select,
	Textarea,
	SwitchControlled,
	BlockPreloader,
	BarPreloader,
	ControlledFormRow,
} from '../../component/ui';
import getOptionsList from '../../utils/getOptionsList';

interface UsersDetailProps {
	dataItems: UsersItemProps[];
	onSubmit: (method: submitMethodProps, master: UsersItemProps) => Promise<unknown>;
	onDelete: (master: number[]) => Promise<unknown>;
	loading: boolean;
}

const UsersDetail = (props: UsersDetailProps) => {
	const {
		dataItems = [],
		onSubmit,
		onDelete,
		loading,
	} = props;

	const { t } = useTranslation([ 'common', 'form', 'types' ]);
	const params = useParams();
	const navigate = useNavigate();
	const [ detailData, setDetailData ] = useState<UsersItemProps>(null);
	const [ confirmOpen, setConfirmOpen ] = useState<boolean>(false);
	const [ confirmData, setConfirmData ] = useState<(string | number)[]>([]);

	const detailOptions = {
		root: `/admin/app/${routes.users.path}`,
	};

	const submitHandler = (data: UsersItemProps) => {
		const master = _.cloneDeep(data);
		const method: submitMethodProps = master.id == 'new' ? 'create' : 'update';
		onSubmit(method, master).then(() => navigate(detailOptions.root));
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

	useEffect(() => setDetailData(getDetailData('Users', dataItems, params.id)), [ dataItems, params ]);

	const getOptionsType = useCallback(
		() => getOptionsList(config.options.model.Users.type, t),
		[ detailData ],
	);
	const getOptionsGroup = useCallback(
		() => getOptionsList(config.options.model.Users.group, t),
		[ detailData ],
	);
	const getOptionsLevel = useCallback(() => {
		let options = [];
		config.options.model.Users.level.map((type) => {
			options.push({
				key: type,
				label: t(`types:${type}`),
				value: USER_LEVEL_KEYS[type],
				disabled: 7 < USER_LEVEL_KEYS[type],
			});
		});

		return options;
	}, [ detailData ]);

	return (
		<>
			<PageHeading
				title={detailData?.id === 'new' ? t('model_new.Users') : detailData?.email}
				returnTo={detailOptions.root}
				createButtonLabel={t('model_new.Users')}
				createButtonPath={`${detailOptions.root}/detail/new`}
			/>
			{loading && <BarPreloader />}
			{detailData ? (
				<ControlledDetailFormLayout
					dataId="UsersDetailForm"
					detailId={detailData.id}
					defaultValues={detailData}
					onSubmit={submitHandler}
					onDelete={() => deleteHandler(detailData.id)}
					renderSidebar={(form) => {
						const { token, form: { control } } = form;

						return (
							<>
								<Section>
									<ControlledFormRow
										name="active"
										control={control}
										rules={{}}
										defaultValue={detailData.active}
										render={({ field }) => {
											const { ref, value, ...rest } = field;

											return (
												<SwitchControlled
													id={`${token}_active`}
													label={t('form:label.active')}
													checked={value}
													inputRef={ref}
													{...rest}
												/>
											);
										}}
									/>
								</Section>
								<Section>
									<ControlledFormRow
										name="item_level"
										control={control}
										rules={{ required: true }}
										defaultValue={detailData.item_level}
										render={({ field, fieldState }) => {
											const { ref, ...rest } = field;
											const { error } = fieldState;

											return (
												<Select
													label={t('form:label.level')}
													placeholder={t('form:placeholder.level')}
													id={`${token}_item_level`}
													error={!!error}
													required
													inputRef={ref}
													options={getOptionsLevel()}
													{...rest}
												/>
											);
										}}
									/>
									<ControlledFormRow
										name="item_group"
										control={control}
										rules={{ required: true }}
										defaultValue={detailData.item_group}
										render={({ field, fieldState }) => {
											const { ref, ...rest } = field;
											const { error } = fieldState;

											return (
												<Select
													label={t('form:label.group')}
													placeholder={t('form:placeholder.group')}
													id={`${token}_item_group`}
													error={!!error}
													required
													inputRef={ref}
													options={getOptionsGroup()}
													{...rest}
												/>
											);
										}}
									/>
								</Section>
								<Section>

									img_avatar

								</Section>
							</>
						);
					}}
					renderPrimary={(form) => {
						const { token, form: {
							control,
							register,
							watch,
						} } = form;

						const watchType = watch('type');

						return (
							<>
								{/* ==================== FORM CONTENT ==================== */}
								<div>

									<input type="hidden" {...register('id')} />
									<input type="hidden" {...register('img_avatar')} />

									<Section divider>

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
														style={{ width: '250px' }}
														{...rest}
													/>
												);
											}}
										/>
										<ControlledFormRow
											name="email"
											control={control}
											rules={{ pattern: EMAIL_REGEX, required: true }}
											defaultValue={detailData.email}
											render={({ field, fieldState }) => {
												const { ref, ...rest } = field;
												const { error } = fieldState;

												return (
													<Input
														type="email"
														label={t('form:label.email')}
														placeholder={t('form:placeholder.email')}
														id={`${token}_email`}
														error={!!error}
														required
														inputRef={ref}
														style={{ width: '75%' }}
														{...rest}
													/>
												);
											}}
										/>
										<ControlledFormRow
											name="password"
											control={control}
											rules={{ required: detailData.id === 'new' }}
											defaultValue={detailData.password || ''}
											rowProps={{
												helpTexts: [ detailData.id === 'new' && t('form:help.password') ],
											}}
											render={({ field, fieldState }) => {
												const { ref, ...rest } = field;
												const { error } = fieldState;

												return (
													<PasswordInput
														label={detailData.id === 'new' ? t('form:label.password') : t('form:label.password_new')}
														placeholder={detailData.id === 'new' ? t('form:placeholder.password') : t('form:placeholder.password_new')}
														id={`${token}_password`}
														error={!!error}
														required={detailData.id === 'new'}
														inputRef={ref}
														style={{ width: '75%' }}
														{...rest}
													/>
												);
											}}
										/>

									</Section>

									<Section divider>

										<ControlledFormRow
											name="nickname"
											control={control}
											rules={{ required: true }}
											defaultValue={detailData.nickname}
											render={({ field, fieldState }) => {
												const { ref, ...rest } = field;
												const { error } = fieldState;

												return (
													<Input
														label={t('form:label.nickname')}
														placeholder={t('form:placeholder.nickname')}
														id={`${token}_nickname`}
														error={!!error}
														required
														inputRef={ref}
														style={{ width: '75%' }}
														{...rest}
													/>
												);
											}}
										/>
										<ControlledFormRow
											name="name_first"
											control={control}
											rules={{}}
											defaultValue={detailData.name_first}
											render={({ field, fieldState }) => {
												const { ref, ...rest } = field;
												const { error } = fieldState;

												return (
													<Input
														label={t('form:label.name_first')}
														placeholder={t('form:placeholder.name_first')}
														id={`${token}_name_first`}
														error={!!error}
														inputRef={ref}
														style={{ width: '75%' }}
														{...rest}
													/>
												);
											}}
										/>
										<ControlledFormRow
											name="name_last"
											control={control}
											rules={{}}
											defaultValue={detailData.name_last}
											render={({ field, fieldState }) => {
												const { ref, ...rest } = field;
												const { error } = fieldState;

												return (
													<Input
														label={t('form:label.name_last')}
														placeholder={t('form:placeholder.name_last')}
														id={`${token}_name_last`}
														error={!!error}
														inputRef={ref}
														style={{ width: '75%' }}
														{...rest}
													/>
												);
											}}
										/>

									</Section>

									<Section>

										<ControlledFormRow
											name="description"
											control={control}
											rules={{}}
											defaultValue={detailData.description}
											render={({ field, fieldState }) => {
												const { ref, ...rest } = field;
												const { error } = fieldState;

												return (
													<Textarea
														label={t('form:label.note')}
														placeholder={t('form:placeholder.note')}
														id={`${token}_description`}
														error={!!error}
														inputRef={ref}
														{...rest}
													/>
												);
											}}
										/>

									</Section>

								</div>
								{/* ==================== \ FORM CONTENT ==================== */}
							</>
						);
					}}
					// renderLanguage={(form) => (<> Language part </>)}
					// renderActions={(form) => (<> Action buttons </>)}
					// renderAddons={(form) => (<> Addons (not form part) </>)}
					// renderSecondary={(form) => (<> Secondary </>)}
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

export default UsersDetail;
