import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';

import config from '../../config';
import routes from '../../routes';
import { EMAIL_REGEX } from '../../constants';
import { useMembers } from '../../hooks/model';
import { MembersItemProps } from '../../types/model';
import { submitMethodProps } from '../../types/common';
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
	ControlledFormRow, TagPicker, DateInput,
} from '../../component/ui';
import {
	getDetailData,
	getOptionsList,
} from '../../utils';

interface MembersDetailProps {
	dataItems: MembersItemProps[];
	onSubmit: (method: submitMethodProps, master: MembersItemProps) => Promise<unknown>;
	onDelete: (master: number[]) => Promise<unknown>;
	loading: boolean;
}

const MembersDetail = (props: MembersDetailProps) => {
	const {
		dataItems = [],
		onSubmit,
		onDelete,
		loading,
	} = props;

	const { t } = useTranslation([ 'common', 'form', 'types' ]);
	const params = useParams();
	const navigate = useNavigate();
	const [ detailData, setDetailData ] = useState<MembersItemProps>(null);
	const [ confirmOpen, setConfirmOpen ] = useState<boolean>(false);
	const [ confirmData, setConfirmData ] = useState<(string | number)[]>([]);
	const [ submitting, setSubmitting ] = useState(false);
	const { checkMembersDuplicates } = useMembers();

	const detailOptions = {
		root: `/admin/app/${routes.members.path}`,
	};

	const submitHandler = (data: MembersItemProps) => {
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

	useEffect(() => setDetailData(getDetailData('Members', dataItems, params.id)), [ dataItems, params ]);

	const getOptionsType = useCallback(
		() => getOptionsList(config.options.model.Members.type, t),
		[ detailData ],
	);
	const getOptionsGroup = useCallback(
		() => getOptionsList(config.options.model.Members.group, t),
		[ detailData ],
	);
	const getOptionsSex = useCallback(
		() => getOptionsList(config.options.model.Members.sex, t),
		[ detailData ],
	);

	return (
		<>
			<PageHeading
				title={detailData?.id === 'new' ? t('model_new.Members') : detailData?.email}
				returnTo={detailOptions.root}
				createButtonLabel={t('model_new.Members')}
				createButtonPath={`${detailOptions.root}/detail/new`}
			/>
			{loading && <BarPreloader />}
			{detailData ? (
				<ControlledDetailFormLayout
					mandatoryInfo
					dataId="MembersDetailForm"
					detailId={detailData.id}
					defaultValues={detailData}
					onSubmit={submitHandler}
					submitting={submitting}
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
									<ControlledFormRow
										name="subscription"
										control={control}
										rules={{}}
										defaultValue={detailData.subscription}
										render={({ field }) => {
											const { ref, value, ...rest } = field;

											return (
												<SwitchControlled
													id={`${token}_subscription`}
													label={t('form:label.subscription')}
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
										name="item_group"
										control={control}
										rules={{}}
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
													inputRef={ref}
													options={getOptionsGroup()}
													{...rest}
												/>
											);
										}}
									/>
								</Section>
								<Section>

									// TODO
									img_avatar

								</Section>
							</>
						);
					}}
					renderPrimary={(form) => {
						const {
							token,
							form: {
								control,
								register,
								watch,
							},
							setExternalError,
						} = form;
						const watchType = watch('type');
						const watchEmail = watch('email');
						const duplicates = checkMembersDuplicates(
							detailData.id as number,
							watchEmail,
						);

						useEffect(() => setExternalError(duplicates), [ duplicates ]);

						return (
							<>
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
														sx={{ width: { xs: '100%', md: '250px' } }}
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
											rowProps={{
												errors: duplicates && [ 'duplicate_email' ]
											}}
											render={({ field, fieldState }) => {
												const { ref, ...rest } = field;
												const { error } = fieldState;

												return (
													<Input
														type="email"
														label={t('form:label.email')}
														placeholder={t('form:placeholder.email')}
														id={`${token}_email`}
														error={!!error || duplicates}
														required
														inputRef={ref}
														sx={{ width: { xs: '100%', md: '75%' } }}
														{...rest}
													/>
												);
											}}
										/>
										<ControlledFormRow
											name="password"
											control={control}
											rules={{ required: (detailData.id === 'new' && watchType === 'customer') }}
											defaultValue={detailData.password || ''}
											rowProps={{
												helpTexts: [ (detailData.id === 'new' && watchType === 'customer') && t('form:help.password') ],
											}}
											render={({ field, fieldState }) => {
												const { ref, ...rest } = field;
												const { error } = fieldState;

												return (
													<PasswordInput
														label={t('form:label.password')}
														placeholder={t('form:placeholder.password')}
														id={`${token}_password`}
														error={!!error}
														required={(detailData.id === 'new' && watchType === 'customer')}
														inputRef={ref}
														sx={{ width: { xs: '100%', md: '75%' } }}
														{...rest}
													/>
												);
											}}
										/>
										<ControlledFormRow
											name="phone"
											control={control}
											rules={{ required: watchType === 'customer' }}
											defaultValue={detailData.phone}
											render={({ field, fieldState }) => {
												const { ref, ...rest } = field;
												const { error } = fieldState;

												return (
													<Input
														type="tel"
														label={t('form:label.phone')}
														placeholder={t('form:placeholder.phone')}
														id={`${token}_phone`}
														error={!!error}
														inputRef={ref}
														sx={{ width: { xs: '100%', md: '75%' } }}
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
											rules={{ required: watchType !== 'customer' }}
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
														required={watchType !== 'customer'}
														inputRef={ref}
														sx={{ width: { xs: '100%', md: '75%' } }}
														{...rest}
													/>
												);
											}}
										/>
										<ControlledFormRow
											name="name_first"
											control={control}
											rules={{ required: watchType === 'customer' }}
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
														required={watchType === 'customer'}
														inputRef={ref}
														sx={{ width: { xs: '100%', md: '75%' } }}
														{...rest}
													/>
												);
											}}
										/>
										<ControlledFormRow
											name="name_last"
											control={control}
											rules={{ required: watchType === 'customer' }}
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
														required={watchType === 'customer'}
														inputRef={ref}
														sx={{ width: { xs: '100%', md: '75%' } }}
														{...rest}
													/>
												);
											}}
										/>
									</Section>
									<Section divider>
										<ControlledFormRow
											name="address"
											control={control}
											rules={{ required: watchType === 'customer' }}
											defaultValue={detailData.address}
											render={({ field, fieldState }) => {
												const { ref, ...rest } = field;
												const { error } = fieldState;

												return (
													<Input
														label={t('form:label.address')}
														placeholder={t('form:placeholder.address')}
														id={`${token}_address`}
														error={!!error}
														required={watchType === 'customer'}
														inputRef={ref}
														sx={{ width: { xs: '100%', md: '75%' } }}
														{...rest}
													/>
												);
											}}
										/>
										<ControlledFormRow
											name="city"
											control={control}
											rules={{ required: watchType === 'customer' }}
											defaultValue={detailData.city}
											render={({ field, fieldState }) => {
												const { ref, ...rest } = field;
												const { error } = fieldState;

												return (
													<Input
														label={t('form:label.city')}
														placeholder={t('form:placeholder.city')}
														id={`${token}_city`}
														error={!!error}
														required={watchType === 'customer'}
														inputRef={ref}
														sx={{ width: { xs: '100%', md: '75%' } }}
														{...rest}
													/>
												);
											}}
										/>
										<ControlledFormRow
											name="country"
											control={control}
											rules={{ required: watchType === 'customer' }}
											defaultValue={detailData.country}
											render={({ field, fieldState }) => {
												const { ref, ...rest } = field;
												const { error } = fieldState;

												return (
													<Input
														label={t('form:label.country')}
														placeholder={t('form:placeholder.country')}
														id={`${token}_country`}
														error={!!error}
														required={watchType === 'customer'}
														inputRef={ref}
														sx={{ width: { xs: '100%', md: '75%' } }}
														{...rest}
													/>
												);
											}}
										/>
										<ControlledFormRow
											name="zip"
											control={control}
											rules={{ required: watchType === 'customer' }}
											defaultValue={detailData.zip}
											render={({ field, fieldState }) => {
												const { ref, ...rest } = field;
												const { error } = fieldState;

												return (
													<Input
														label={t('form:label.zip')}
														placeholder={t('form:placeholder.zip')}
														id={`${token}_zip`}
														error={!!error}
														required={watchType === 'customer'}
														inputRef={ref}
														sx={{ width: { xs: '100%', md: '200px' } }}
														{...rest}
													/>
												);
											}}
										/>
									</Section>
									<Section divider>
										<ControlledFormRow
											name="sex"
											control={control}
											rules={{}}
											defaultValue={detailData.sex}
											render={({ field, fieldState }) => {
												const { ref, ...rest } = field;
												const { error } = fieldState;

												return (
													<Select
														label={t('form:label.sex')}
														placeholder={t('form:placeholder.sex')}
														id={`${token}_sex`}
														error={!!error}
														inputRef={ref}
														options={getOptionsSex()}
														sx={{ width: { xs: '100%', md: '200px' } }}
														{...rest}
													/>
												);
											}}
										/>
										<ControlledFormRow
											name="birthdate"
											control={control}
											rules={{}}
											defaultValue={detailData.birthdate}
											rowProps={{
												helpTexts: [
													t('form:help.common_date_format'),
												],
											}}
											render={({ field, fieldState }) => {
												const { ref, ...rest } = field;
												const { error } = fieldState;

												return (
													<DateInput
														label={t('form:label.birthdate')}
														inputRef={ref}
														InputProps={{
															placeholder: t('form:placeholder.birthdate'),
															id: `${token}_birthdate`,
															error: !!error,
															required: true,
															sx: { width: { xs: '100%', md: '250px' } }
														}}
														{...rest}
													/>
												);
											}}
										/>
										<ControlledFormRow
											name="position"
											control={control}
											rules={{}}
											defaultValue={detailData.position}
											render={({ field, fieldState }) => {
												const { ref, ...rest } = field;
												const { error } = fieldState;

												return (
													<Input
														label={t('form:label.position')}
														placeholder={t('form:placeholder.position')}
														id={`${token}_position`}
														error={!!error}
														inputRef={ref}
														sx={{ width: { xs: '100%', md: '75%' } }}
														{...rest}
													/>
												);
											}}
										/>
									</Section>
									<Section divider>
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
									<Section>
										<ControlledFormRow
											name="phone_alt"
											control={control}
											rules={{}}
											defaultValue={detailData.phone_alt}
											render={({ field, fieldState }) => {
												const { value, onChange } = field;

												return (
													<TagPicker
														value={value}
														onChange={onChange}
														id={`${token}_phone_alt`}
														placeholder={t('form:placeholder.phone_alt')}
														inputType="tel"
													/>
												);
											}}
										/>
										<ControlledFormRow
											name="email_alt"
											control={control}
											rules={{}}
											defaultValue={detailData.email_alt}
											render={({ field, fieldState }) => {
												const { value, onChange } = field;

												return (
													<TagPicker
														value={value}
														onChange={onChange}
														id={`${token}_email_alt`}
														placeholder={t('form:placeholder.email_alt')}
														inputType="email"
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

export default MembersDetail;
