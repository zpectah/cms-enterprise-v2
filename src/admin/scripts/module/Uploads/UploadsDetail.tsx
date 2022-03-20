import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';

import config from '../../config';
import { file as fileUtils } from '../../../../../utils/helpers';
import routes from '../../routes';
import useSettings from '../../hooks/useSettings';
import { UploadsItemProps } from '../../types/model';
import { submitMethodProps } from '../../types/common';
import PageHeading from '../../component/PageHeading';
import {
	ConfirmDialog,
	ControlledDetailFormLayout,
	Section,
	Input,
	Textarea,
	SwitchControlled,
	BlockPreloader,
	BarPreloader,
	ControlledFormRow,
} from '../../component/ui';
import {
	getDetailData,
	transformString,
} from '../../utils';
import Uploader from './Uploader';
import ThumbnailView from './ThumbnailView';
import InfoMetaBlock from '../../component/InfoMetaBlock';

interface UploadsDetailProps {
	dataItems: UploadsItemProps[];
	onSubmit: (method: submitMethodProps, master: UploadsItemProps) => Promise<unknown>;
	onDelete: (master: number[]) => Promise<unknown>;
	loading: boolean;
	onFinishSubmit?: (count: number) => void;
}

const UploadsDetail = (props: UploadsDetailProps) => {
	const {
		dataItems = [],
		onSubmit,
		onDelete,
		loading,
		onFinishSubmit,
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

	const finishSubmitHandler = (count: number) => {
		if (onFinishSubmit) onFinishSubmit(count);
		navigate(detailOptions.root);
	};
	const submitHandler = (data: UploadsItemProps) => {
		const master = _.cloneDeep(data);
		const method: submitMethodProps = master.id == 'new' ? 'create' : 'update';
		master.name = transformString(master.name, 'empty-to-dash');
		onSubmit(method, master).then(() => {
			if (method === 'update') navigate(detailOptions.root);
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

	const getMetaList = useCallback(() => {
		const list = {
			'created': detailData.created ? detailData.created : 'N/A',
			'file_size': detailData.file_size ? fileUtils.formatBytes(detailData.file_size) : 'N/A',
			'file_path': `${config.environmental.root}uploads/${detailData.type}/${detailData.file_name}`,
		};
		if (detailData.type === 'image') {
			config.options.model.Uploads.image.format.map((format) => {
				list[`image_${format.key}`] = `${config.environmental.root}uploads/${detailData.type}/${format.key}/${detailData.file_name}`;
			});
		}

		return list;
	}, [ detailData ]);

	return (
		<>
			<PageHeading
				title={detailData?.id === 'new' ? t('model_new.Uploads') : detailData?.file_name}
				returnTo={detailOptions.root}
				createButtonLabel={t('model_new.Uploads')}
				createButtonPath={`${detailOptions.root}/detail/new`}
			/>
			{loading && <BarPreloader />}
			{detailData ? (
				<>
					{detailData.id === 'new' ? (
						<Uploader
							modelData={detailData}
							onSubmitItem={async (master) => {
								await submitHandler(master);
							}}
							onFinishSubmit={finishSubmitHandler}
						/>
					) : (
						<>
							<ThumbnailView
								name={detailData.name}
								fileType={detailData.type}
								fileName={detailData.file_name}
							/>
							<ControlledDetailFormLayout
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
									const { form: { register } } = form;

									return (
										<>
											<input type="hidden" {...register('id')} />
											<input type="hidden" {...register('type')} />
											<input type="hidden" {...register('name')} />
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
								renderSecondary={() => (
									<Section>
										<InfoMetaBlock
											list={getMetaList()}
										/>
									</Section>
								)}
							/>
						</>
					)}
				</>
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
