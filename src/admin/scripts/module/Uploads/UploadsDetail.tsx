import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';

import config from '../../config';
import routes from '../../routes';
import { USER_LEVEL_KEYS } from '../../constants';
import useSettings from '../../hooks/useSettings';
import { UploadsItemProps } from '../../types/model';
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
} from '../../component/ui';
import getOptionsList from '../../utils/getOptionsList';
import getLocaleObject from '../../utils/getLocaleObject';
import transformString from '../../utils/transformString';

interface UploadsDetailProps {
	dataItems: UploadsItemProps[];
	onSubmit: (method: submitMethodProps, master: UploadsItemProps) => Promise<unknown>;
	onDelete: (master: number[]) => Promise<unknown>;
	loading: boolean;
}

const UploadsDetail = (props: UploadsDetailProps) => {
	const {
		dataItems = [],
		onSubmit,
		onDelete,
		loading,
	} = props;

	const { t } = useTranslation([ 'common', 'form', 'types' ]);
	const params = useParams();
	const navigate = useNavigate();
	const [ detailData, setDetailData ] = useState<UploadsItemProps>(null);
	const [ confirmOpen, setConfirmOpen ] = useState<boolean>(false);
	const [ confirmData, setConfirmData ] = useState<(string | number)[]>([]);
	const { settings } = useSettings();
	const languageActive = settings?.language_active;

	const detailOptions = {
		root: `/admin/app/${routes.uploads.path}`,
	};

	const submitHandler = (data: UploadsItemProps) => {
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
			'Uploads',
			dataItems,
			params.id,
			languageActive,
			{
				label: '',
				description: '',
			},
		)),
		[ dataItems, params, languageActive ],
	);

	const getOptionsType = useCallback(
		() => getOptionsList(config.options.model.Uploads.type, t),
		[ detailData ],
	);

	return (
		<>
			<PageHeading
				title={detailData?.id === 'new' ? t('model_new.Uploads') : detailData?.name}
				returnTo={detailOptions.root}
				createButtonLabel={t('model_new.Uploads')}
				createButtonPath={`${detailOptions.root}/detail/new`}
			/>
			{loading && <BarPreloader />}
			{detailData ? (
				<ControlledDetailFormLayout
					mandatoryInfo
					dataId="UploadsDetailForm"
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

								</div>
								{/* ==================== \ FORM CONTENT ==================== */}
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
									name={`lang.${lang}.label`}
									control={control}
									rules={{}}
									defaultValue={detailData.lang[lang].label}
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
					renderSecondary={(form) => {
						const { token, form: {
							watch,
						} } = form;

						const watchAll = watch();

						return (
							<>
								<pre>
									<code>
										{JSON.stringify(watchAll, null, 2)}
									</code>
								</pre>
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

export default UploadsDetail;