import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';

import config from '../../config';
import routes from '../../routes';
import useSettings from '../../hooks/useSettings';
import { usePages } from '../../hooks/model';
import { PagesItemProps } from '../../types/model';
import { submitMethodProps, entityActionsType } from '../../types/common';
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
	Wysiswyg,
} from '../../component/ui';
import { CategoriesPicker } from '../../component/Picker';
import {
	getDetailData,
	getOptionsList,
	transformString,
} from '../../utils';

interface PagesDetailProps {
	dataItems: PagesItemProps[];
	onSubmit: (method: submitMethodProps, master: PagesItemProps) => Promise<unknown>;
	onDelete: (master: number[]) => Promise<unknown>;
	loading: boolean;
	actions: entityActionsType;
}

const PagesDetail = (props: PagesDetailProps) => {
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
	const [ detailData, setDetailData ] = useState<PagesItemProps>(null);
	const [ confirmOpen, setConfirmOpen ] = useState<boolean>(false);
	const [ confirmData, setConfirmData ] = useState<(string | number)[]>([]);
	const [ submitting, setSubmitting ] = useState(false);
	const { settings } = useSettings();
	const { checkPagesDuplicates } = usePages();
	const languageActive = settings?.language_active;

	const detailOptions = {
		root: `/admin/app/${routes.pages.path}`,
	};

	const submitHandler = (data: PagesItemProps) => {
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
			'Pages',
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

	const options_type = useMemo(() => getOptionsList(config.options.model.Pages.type, t), [ detailData ]);
	const options_elements = useMemo(() => getOptionsList(config.options.model.Pages.elements, t), [ detailData ]);
	const options_index = useMemo(() => getOptionsList([ 'inherit', ...config.options.common.meta_robots ], t), [ detailData ]);

	return (
		<>
			<PageHeading
				title={detailData?.id === 'new' ? t('model_new.Pages') : detailData?.name}
				returnTo={detailOptions.root}
				createButtonLabel={t('model_new.Pages')}
				createButtonPath={`${detailOptions.root}/detail/new`}
			/>
			{loading && <BarPreloader />}
			{detailData ? (
				<ControlledDetailFormLayout
					mandatoryInfo
					dataId="PagesDetailForm"
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
						const watchName = watch('name');
						const duplicates = checkPagesDuplicates(
							detailData.id as number,
							watchName,
						);

						useEffect(() => setExternalError(duplicates), [ duplicates ]);

						return (
							<>
								<input type="hidden" {...register('id')} />
								<Section divider={watchType === 'category'}>
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
													options={options_type}
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
								{watchType === 'category' ? (
									<Section>
										<ControlledFormRow
											name="type_id"
											control={control}
											rules={{ required: true }}
											defaultValue={detailData.type_id}
											render={({ field, fieldState }) => {
												const { ref, value, onChange } = field;
												const { error } = fieldState;

												return (
													<CategoriesPicker
														value={value}
														onChange={onChange}
														label={t('form:label.category')}
														placeholder={t('form:placeholder.category')}
														id={`${token}_type_id`}
														error={!!error}
														required
														emptyValueOption
													/>
												);
											}}
										/>
									</Section>
								) : (
									<input type="hidden" {...register('type_id', { value: detailData.type_id })} />
								)}
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
								<ControlledFormRow
									name={`lang.${lang}.content`}
									control={control}
									rules={{ required: watchType !== 'category' }}
									defaultValue={detailData.lang[lang].content}
									render={({ field, fieldState }) => {
										const { ref, value, onChange, ...rest } = field;
										const { error } = fieldState;

										return (
											<Wysiswyg
												value={value}
												onChange={onChange}
												placeholder={t('form:placeholder.content')}
												error={!!error}
												required={watchType !== 'category'}
												id={`${token}_${lang}_content`}
												inputRef={ref}
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
							<Section>
								<ControlledFormRow
									name="meta_robots"
									control={control}
									rules={{ required: true }}
									defaultValue={detailData.meta_robots}
									render={({ field, fieldState }) => {
										const { ref, ...rest } = field;
										const { error } = fieldState;

										return (
											<Select
												options={options_index}
												label={t('form:label.meta_robots')}
												placeholder={t('form:placeholder.meta_robots')}
												id={`${token}_meta_robots`}
												error={!!error}
												required
												inputRef={ref}
												sx={{ width: { xs: '100%', md: '50%' } }}
												{...rest}
											/>
										);
									}}
								/>
								<ControlledFormRow
									name="page_elements"
									control={control}
									rules={{}}
									defaultValue={detailData.page_elements}
									render={({ field, fieldState }) => {
										const { ref, ...rest } = field;
										const { error } = fieldState;

										return (
											<Select
												options={options_elements}
												label={t('form:label.page_elements')}
												placeholder={t('form:placeholder.page_elements')}
												id={`${token}_page_elements`}
												error={!!error}
												inputRef={ref}
												multiple
												sx={{ width: { xs: '100%', md: '75%' } }}
												{...rest}
											/>
										);
									}}
								/>
							</Section>
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

export default PagesDetail;
