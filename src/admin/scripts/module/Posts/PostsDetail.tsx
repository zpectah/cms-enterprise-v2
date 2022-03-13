import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';
import Rating from '@mui/material/Rating';

import config from '../../config';
import routes from '../../routes';
import { USER_LEVEL_KEYS } from '../../constants';
import useSettings from '../../hooks/useSettings';
import useProfile from '../../hooks/useProfile';
import { PostsItemProps } from '../../types/model';
import { submitMethodProps } from '../../types/common';
import getDetailData from '../../utils/getDetailData';
import PageHeading from '../../component/PageHeading';
import {
	ConfirmDialog,
	ControlledDetailFormLayout,
	Section,
	Input,
	Textarea,
	Select,
	SwitchControlled,
	BlockPreloader,
	BarPreloader,
	ControlledFormRow,
	TagPicker,
	DateInput,
	DateTimeInput,
} from '../../component/ui';
import {
	CategoriesPicker,
	TagsPicker,
	UsersPicker,
} from '../../component/Picker';
import LocationPicker from '../../component/LocationPicker';
import InfoMetaBlock from '../../component/InfoMetaBlock';
import getOptionsList from '../../utils/getOptionsList';
import getLocaleObject from '../../utils/getLocaleObject';
import transformString from '../../utils/transformString';

interface PostsDetailProps {
	dataItems: PostsItemProps[];
	onSubmit: (method: submitMethodProps, master: PostsItemProps) => Promise<unknown>;
	onDelete: (master: number[]) => Promise<unknown>;
	loading: boolean;
}

const PostsDetail = (props: PostsDetailProps) => {
	const {
		dataItems = [],
		onSubmit,
		onDelete,
		loading,
	} = props;

	const { t } = useTranslation([ 'common', 'form', 'types' ]);
	const params = useParams();
	const navigate = useNavigate();
	const [ detailData, setDetailData ] = useState<PostsItemProps>(null);
	const [ confirmOpen, setConfirmOpen ] = useState<boolean>(false);
	const [ confirmData, setConfirmData ] = useState<(string | number)[]>([]);
	const { settings } = useSettings();
	const { profile } = useProfile();
	const languageActive = settings?.language_active;

	const detailOptions = {
		root: `/admin/app/${routes.posts.path}`,
	};

	const submitHandler = (data: PostsItemProps) => {
		const master = _.cloneDeep(data);
		const method: submitMethodProps = master.id == 'new' ? 'create' : 'update';
		master.name = transformString(master.name, 'empty-to-dash');
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

	useEffect(
		() => setDetailData(getDetailData(
			'Posts',
			dataItems,
			params.id,
			languageActive,
			{
				title: '',
				description: '',
				content: '',
			},
		)),
		[ dataItems, params, languageActive ],
	);

	const getOptionsType = useCallback(
		() => getOptionsList(config.options.model.Posts.type, t),
		[ detailData ],
	);

	return (
		<>
			<PageHeading
				title={detailData?.id === 'new' ? t('model_new.Posts') : detailData?.name}
				returnTo={detailOptions.root}
				createButtonLabel={t('model_new.Posts')}
				createButtonPath={`${detailOptions.root}/detail/new`}
			/>
			{loading && <BarPreloader />}
			{detailData ? (
				<ControlledDetailFormLayout
					mandatoryInfo
					dataId="PostsDetailForm"
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
									<ControlledFormRow
										name="template"
										control={control}
										rules={{}}
										defaultValue={detailData.template}
										render={({ field }) => {
											const { ref, value, ...rest } = field;

											return (
												<SwitchControlled
													id={`${token}_template`}
													label={t('form:label.template')}
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
										name="author"
										control={control}
										rules={{ required: true }}
										defaultValue={detailData.id === 'new' ? profile?.id : detailData.author}
										render={({ field, fieldState }) => {
											const { ref, value, onChange } = field;
											const { error } = fieldState;

											return (
												<UsersPicker
													value={value}
													onChange={onChange}
													label={t('form:label.author')}
													placeholder={t('form:placeholder.author')}
													id={`${token}_author`}
													error={!!error}
													currentUserId={detailData.id === 'new' ? profile?.id : detailData.author}
													inputSx={{
														width: {
															md: '100%',
														}
													}}
												/>
											);
										}}
									/>

								</Section>
								<Section>

									img_main

									img_thumbnail

								</Section>
								<Section>

									<InfoMetaBlock
										list={{
											rating: <Rating name="read-only" size="small" value={detailData.rating} readOnly />,
										}}
									/>

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

									<Section divider={watchType === 'event' || watchType === 'media'}>
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
											name="name"
											control={control}
											rules={{ required: true }}
											defaultValue={detailData.name}
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
														sx={{ width: { xs: '100%', md: '75%' } }}
														{...rest}
													/>
												);
											}}
										/>
										<ControlledFormRow
											name="published"
											control={control}
											rules={{}}
											defaultValue={detailData.published}
											rowProps={{
												helpTexts: [ detailData.id === 'new' && t('form:help.published') ],
											}}
											render={({ field, fieldState }) => {
												const { ref, ...rest } = field;
												const { error } = fieldState;

												return (
													<DateInput
														label={t('form:label.published')}
														inputRef={ref}
														InputProps={{
															placeholder: t('form:placeholder.published'),
															id: `${token}_published`,
															error: !!error,
															sx: { width: { xs: '100%', md: '250px' } },
														}}
														{...rest}
													/>
												);
											}}
										/>

									</Section>

									{watchType === 'event' ? (
										<Section>
											<ControlledFormRow
												name="event_start"
												control={control}
												rules={{ required: true }}
												defaultValue={detailData.event_start}
												rowProps={{
													helpTexts: [
														t('form:help.common_datetime_format'),
													],
												}}
												render={({ field, fieldState }) => {
													const { ref, ...rest } = field;
													const { error } = fieldState;

													return (
														<DateTimeInput
															label={t('form:label.event_start')}
															inputRef={ref}
															InputProps={{
																placeholder: t('form:placeholder.event_start'),
																id: `${token}_event_start`,
																error: !!error,
																required: true,
																sx: { width: { xs: '100%', md: '250px' } }
															}}
															required
															{...rest}
														/>
													);
												}}
											/>
											<ControlledFormRow
												name="event_end"
												control={control}
												rules={{ required: true }}
												defaultValue={detailData.event_end}
												rowProps={{
													helpTexts: [
														t('form:help.common_datetime_format'),
													],
												}}
												render={({ field, fieldState }) => {
													const { ref, ...rest } = field;
													const { error } = fieldState;

													return (
														<DateTimeInput
															label={t('form:label.event_end')}
															inputRef={ref}
															InputProps={{
																placeholder: t('form:placeholder.event_end'),
																id: `${token}_event_end`,
																error: !!error,
																required: true,
																sx: { width: { xs: '100%', md: '250px' } }
															}}
															required
															{...rest}
														/>
													);
												}}
											/>
											<ControlledFormRow
												name="event_location"
												control={control}
												rules={{}}
												defaultValue={detailData.event_location}
												render={({ field, fieldState }) => {
													const {
														ref,
														value,
														onChange,
													} = field;
													const { error } = fieldState;

													return (
														<LocationPicker
															placeholder={t('form:placeholder.location')}
															id={`${token}_event_location`}
															inputRef={ref}
															error={!!error}
															value={value}
															onSelect={onChange}
														/>
													);
												}}
											/>
											<ControlledFormRow
												name="event_address"
												control={control}
												rules={{}}
												defaultValue={detailData.event_address}
												render={({ field, fieldState }) => {
													const { ref, ...rest } = field;
													const { error } = fieldState;

													return (
														<Input
															label={t('form:label.address')}
															placeholder={t('form:placeholder.address')}
															id={`${token}_event_address`}
															error={!!error}
															inputRef={ref}
															sx={{ width: { xs: '100%', md: '75%' } }}
															{...rest}
														/>
													);
												}}
											/>
											<ControlledFormRow
												name="event_city"
												control={control}
												rules={{}}
												defaultValue={detailData.event_city}
												render={({ field, fieldState }) => {
													const { ref, ...rest } = field;
													const { error } = fieldState;

													return (
														<Input
															label={t('form:label.city')}
															placeholder={t('form:placeholder.city')}
															id={`${token}_event_city`}
															error={!!error}
															inputRef={ref}
															sx={{ width: { xs: '100%', md: '75%' } }}
															{...rest}
														/>
													);
												}}
											/>
											<ControlledFormRow
												name="event_country"
												control={control}
												rules={{}}
												defaultValue={detailData.event_country}
												render={({ field, fieldState }) => {
													const { ref, ...rest } = field;
													const { error } = fieldState;

													return (
														<Input
															label={t('form:label.country')}
															placeholder={t('form:placeholder.country')}
															id={`${token}_event_country`}
															error={!!error}
															inputRef={ref}
															sx={{ width: { xs: '100%', md: '75%' } }}
															{...rest}
														/>
													);
												}}
											/>
											<ControlledFormRow
												name="event_zip"
												control={control}
												rules={{}}
												defaultValue={detailData.event_zip}
												render={({ field, fieldState }) => {
													const { ref, ...rest } = field;
													const { error } = fieldState;

													return (
														<Input
															label={t('form:label.zip')}
															placeholder={t('form:placeholder.zip')}
															id={`${token}_event_zip`}
															error={!!error}
															inputRef={ref}
															sx={{ width: { xs: '100%', md: '200px' } }}
															{...rest}
														/>
													);
												}}
											/>
										</Section>
									) : (
										<>
											<input type="hidden" {...register('event_start', { value: detailData.event_start })} />
											<input type="hidden" {...register('event_end', { value: detailData.event_end })} />
											<input type="hidden" {...register('event_location', { value: detailData.event_location })} />
											<input type="hidden" {...register('event_address', { value: detailData.event_address })} />
											<input type="hidden" {...register('event_city', { value: detailData.event_city })} />
											<input type="hidden" {...register('event_country', { value: detailData.event_country })} />
											<input type="hidden" {...register('event_zip', { value: detailData.event_zip })} />
										</>
									)}

									{watchType === 'media' ? (
										<Section>

											<ControlledFormRow
												name="media"
												control={control}
												rules={{ required: true }}
												defaultValue={detailData.media}
												render={({ field, fieldState }) => {
													const { ref, ...rest } = field;
													const { error } = fieldState;

													return (
														<Input
															label={t('form:label.media')}
															placeholder={t('form:placeholder.media')}
															id={`${token}_media`}
															error={!!error}
															required
															inputRef={ref}
															style={{ width: '75%' }}
															{...rest}
														/>
													);
												}}
											/>

										</Section>
									) : (
										<>
											<input type="hidden" {...register('media', { value: detailData.media })} />
										</>
									)}

								</div>
								{/* ==================== \ FORM CONTENT ==================== */}
							</>
						);
					}}
					renderLanguage={(form) => {
						const {
							token,
							form: {
								control,
								watch,
							},
							lang,
						} = form;

						const watchType = watch('type');

						return (
							<>

								<ControlledFormRow
									name={`lang.${lang}.title`}
									control={control}
									rules={{ required: true }}
									defaultValue={detailData.lang[lang].title}
									render={({ field, fieldState }) => {
										const { ref, ...rest } = field;
										const { error } = fieldState;

										return (
											<Input
												label={t('form:label.title')}
												placeholder={t('form:placeholder.title')}
												id={`${token}_${lang}_title`}
												error={!!error}
												required
												inputRef={ref}
												{...rest}
											/>
										);
									}}
								/>
								<ControlledFormRow
									name={`lang.${lang}.description`}
									control={control}
									rules={{ required: true }}
									defaultValue={detailData.lang[lang].description}
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
												rows={5}
												required
												{...rest}
											/>
										);
									}}
								/>
								<ControlledFormRow
									name={`lang.${lang}.content`}
									control={control}
									rules={{ required: watchType === 'article' || watchType === 'blog' }}
									defaultValue={detailData.lang[lang].content}
									render={({ field, fieldState }) => {
										const { ref, ...rest } = field;
										const { error } = fieldState;

										return (
											<Textarea
												label={t('form:label.content')}
												placeholder={t('form:placeholder.content')}
												id={`${token}_${lang}_content`}
												error={!!error}
												inputRef={ref}
												rows={10}
												required={watchType === 'article' || watchType === 'blog'}
												{...rest}
											/>
										);
									}}
								/>

							</>
						);
					}}
					renderSecondary={(form) => {
						const {
							token,
							form: { control },
						} = form;

						return (
							<>

								<Section divider>

									<ControlledFormRow
										name="categories"
										control={control}
										rules={{}}
										defaultValue={detailData.categories}
										render={({ field, fieldState }) => {
											const { ref, value, onChange } = field;
											const { error } = fieldState;

											return (
												<CategoriesPicker
													value={value}
													onChange={onChange}
													label={t('form:label.categories')}
													placeholder={t('form:placeholder.categories')}
													id={`${token}_categories`}
													error={!!error}
													multiple
												/>
											);
										}}
									/>
									<ControlledFormRow
										name="tags"
										control={control}
										rules={{}}
										defaultValue={detailData.tags}
										render={({ field, fieldState }) => {
											const { ref, value, onChange } = field;
											const { error } = fieldState;

											return (
												<TagsPicker
													value={value}
													onChange={onChange}
													label={t('form:label.tags')}
													placeholder={t('form:placeholder.tags')}
													id={`${token}_tags`}
													error={!!error}
													multiple
												/>
											);
										}}
									/>

								</Section>
								<Section divider>

									<ControlledFormRow
										name="links"
										control={control}
										rules={{}}
										defaultValue={detailData.links}
										render={({ field, fieldState }) => {
											const { value, onChange } = field;

											return (
												<TagPicker
													value={value}
													onChange={onChange}
													id={`${token}_links`}
													placeholder={t('form:placeholder.links')}
												/>
											);
										}}
									/>

								</Section>
								<Section>

									attachments

									<br />

								</Section>

							</>
						);
					}}
					renderAddons={(form) => {
						const {
							token,
							form: { watch }
						} = form;

						return (
							<>
								addons ... comments

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

export default PostsDetail;
