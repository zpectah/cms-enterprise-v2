import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';

import config from '../../config';
import routes from '../../routes';
import { USER_LEVEL_KEYS } from '../../constants';
import useSettings from '../../hooks/useSettings';
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
	ControlledFormRow, TagPicker,
} from '../../component/ui';
import {
	CategoriesPicker,
	TagsPicker,
} from '../../component/Picker';
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
	const languageActive = settings?.language_active;

	const detailOptions = {
		root: `/admin/app/${routes.posts.path}`,
	};

	const submitHandler = (data: PostsItemProps) => {
		const master = _.cloneDeep(data);
		const method: submitMethodProps = master.id == 'new' ? 'create' : 'update';
		master.name = transformString(master.name, 'empty-to-dash');
		master.author = getUserId();
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

	const getUserId = useCallback(() => {
		let uid = detailData.author;
		if (detailData.id === 'new') uid = 0; // TODO ... from profile object !!!

		return uid;
	}, [ detailData ]);

	return (
		<>
			<PageHeading
				title={detailData?.id === 'new' ? t('model_new.Posts') : detailData?.name}
				returnTo={detailOptions.root}
				createButtonLabel={t('model_new.Posts')}
				createButtonPath={detailData?.id !== 'new' && `${detailOptions.root}/detail/new`}
			/>
			{loading && <BarPreloader />}
			{detailData ? (
				<ControlledDetailFormLayout
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

									img_main

									img_thumbnail

								</Section>
								<Section>

									nějakej meta info blok ... pro rating ...

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
														style={{ width: '250px' }}
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
														style={{ width: '75%' }}
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
												render={({ field, fieldState }) => {
													const { ref, ...rest } = field;
													const { error } = fieldState;

													return (
														<Input
															label={t('form:label.event_start')}
															placeholder={t('form:placeholder.event_start')}
															id={`${token}_event_start`}
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
												name="event_end"
												control={control}
												rules={{ required: true }}
												defaultValue={detailData.event_end}
												render={({ field, fieldState }) => {
													const { ref, ...rest } = field;
													const { error } = fieldState;

													return (
														<Input
															label={t('form:label.event_end')}
															placeholder={t('form:placeholder.event_end')}
															id={`${token}_event_end`}
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
												name="event_location"
												control={control}
												rules={{ required: true }}
												defaultValue={detailData.event_location}
												render={({ field, fieldState }) => {
													const { ref, ...rest } = field;
													const { error } = fieldState;

													return (
														<Input
															label={t('form:label.location')}
															placeholder={t('form:placeholder.location')}
															id={`${token}_event_location`}
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
												name="event_address"
												control={control}
												rules={{ required: true }}
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
															required
															inputRef={ref}
															style={{ width: '75%' }}
															{...rest}
														/>
													);
												}}
											/>
											<ControlledFormRow
												name="event_city"
												control={control}
												rules={{ required: true }}
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
															required
															inputRef={ref}
															style={{ width: '75%' }}
															{...rest}
														/>
													);
												}}
											/>
											<ControlledFormRow
												name="event_country"
												control={control}
												rules={{ required: true }}
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
															required
															inputRef={ref}
															style={{ width: '75%' }}
															{...rest}
														/>
													);
												}}
											/>
											<ControlledFormRow
												name="event_zip"
												control={control}
												rules={{ required: true }}
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
									<ControlledFormRow
										name="published"
										control={control}
										rules={{}}
										defaultValue={detailData.published}
										rowProps={{
											helpTexts: [
												t('form:help.published'),
											],
										}}
										render={({ field, fieldState }) => {
											const { ref, ...rest } = field;
											const { error } = fieldState;

											return (
												<Input
													label={t('form:label.published')}
													placeholder={t('form:placeholder.published')}
													id={`${token}_published`}
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

									attachments

									<br />

								</Section>

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
