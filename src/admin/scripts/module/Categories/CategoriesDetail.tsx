import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';

import config from '../../config';
import routes from '../../routes';
import useSettings from '../../hooks/useSettings';
import { useCategories } from '../../hooks/model';
import { CategoriesItemProps } from '../../types/model';
import { submitMethodProps, entityActionsType } from '../../types/common';
import PageHeading from '../../component/PageHeading';
import CommentsManager from '../Comments/CommentsManager';
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
} from '../../component/ui';
import { CategoriesPicker } from '../../component/Picker';
import {
	getDetailData,
	getOptionsList,
	transformString,
} from '../../utils';
import UploadsPicker from '../../component/UploadsPicker';

interface CategoriesDetailProps {
	dataItems: CategoriesItemProps[];
	onSubmit: (method: submitMethodProps, master: CategoriesItemProps) => Promise<unknown>;
	onDelete: (master: number[]) => Promise<unknown>;
	loading: boolean;
	actions: entityActionsType;
}

const CategoriesDetail = (props: CategoriesDetailProps) => {
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
	const [ detailData, setDetailData ] = useState<CategoriesItemProps>(null);
	const [ confirmOpen, setConfirmOpen ] = useState<boolean>(false);
	const [ confirmData, setConfirmData ] = useState<(string | number)[]>([]);
	const [ submitting, setSubmitting ] = useState(false);
	const { settings } = useSettings();
	const { checkCategoriesDuplicates } = useCategories();
	const languageActive = settings?.language_active;

	const detailOptions = {
		root: `/admin/app/${routes.categories.path}`,
	};

	const submitHandler = (data: CategoriesItemProps) => {
		setSubmitting(true);
		const master = _.cloneDeep(data);
		const method: submitMethodProps = master.id == 'new' ? 'create' : 'update';
		master.name = transformString(master.name, 'empty-to-dash');
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

	useEffect(
		() => setDetailData(getDetailData(
			'Categories',
			dataItems,
			params.id,
			languageActive,
			{
				title: '',
				description: '',
			},
		)),
		[ dataItems, params, languageActive ],
	);

	const getOptionsType = useCallback(
		() => getOptionsList(config.options.model.Categories.type, t),
		[ detailData ],
	);

	return (
		<>
			<PageHeading
				title={detailData?.id === 'new' ? t('model_new.Categories') : detailData?.name}
				returnTo={detailOptions.root}
				createButtonLabel={t('model_new.Categories')}
				createButtonPath={`${detailOptions.root}/detail/new`}
			/>
			{loading && <BarPreloader />}
			{detailData ? (
				<ControlledDetailFormLayout
					mandatoryInfo
					dataId="CategoriesDetailForm"
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
										name="img_main"
										control={control}
										rules={{}}
										defaultValue={detailData.img_main}
										render={({ field, fieldState }) => {
											const { onChange } = field;

											return (
												<UploadsPicker
													variant="thumbnail"
													buttonLabel={t('form:placeholder.img_main')}
													initialValue={detailData.img_main}
													onChange={onChange}
												/>
											);
										}}
									/>
									<ControlledFormRow
										name="img_thumbnail"
										control={control}
										rules={{}}
										defaultValue={detailData.img_thumbnail}
										render={({ field, fieldState }) => {
											const { onChange } = field;

											return (
												<UploadsPicker
													variant="thumbnail"
													buttonLabel={t('form:placeholder.img_thumbnail')}
													initialValue={detailData.img_thumbnail}
													onChange={onChange}
												/>
											);
										}}
									/>
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
						const watchName = watch('name');
						const duplicates = checkCategoriesDuplicates(
							detailData.id as number,
							watchName,
						);

						useEffect(() => setExternalError(duplicates), [ duplicates ]);

						return (
							<>
								<div>
									<input type="hidden" {...register('id')} />
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
											name="name"
											control={control}
											rules={{ required: true }}
											defaultValue={detailData.name}
											rowProps={{
												errors: duplicates && [ 'duplicate_name' ]
											}}
											render={({ field, fieldState }) => {
												const { ref, ...rest } = field;
												const { error } = fieldState;

												return (
													<Input
														label={t('form:label.name')}
														placeholder={t('form:placeholder.name')}
														id={`${token}_name`}
														error={!!error || duplicates}
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
											name="parent"
											control={control}
											rules={{}}
											defaultValue={detailData.parent}
											render={({ field, fieldState }) => {
												const { ref, value, onChange } = field;
												const { error } = fieldState;

												return (
													<CategoriesPicker
														value={value}
														onChange={onChange}
														label={t('form:label.parent')}
														placeholder={t('form:placeholder.parent')}
														id={`${token}_parent`}
														error={!!error}
														ignored={detailData.id !== 'new' ? [
															detailData.id as number
														] : []}
														emptyValueOption
													/>
												);
											}}
										/>
									</Section>
								</div>
							</>
						);
					}}
					renderLanguage={(form) => {
						const {
							token,
							form: { control },
							lang,
						} = form;

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
									rules={{}}
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
												{...rest}
											/>
										);
									}}
								/>
							</>
						);
					}}
					renderAddons={() => (
						<CommentsManager
							model="Categories"
							detailId={detailData.id as number}
						/>
					)}
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

export default CategoriesDetail;
