import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';

import config from '../../config';
import routes from '../../routes';
import { USER_LEVEL_KEYS } from '../../constants';
import { TagsItemProps } from '../../types/model';
import { submitMethodProps } from '../../types/common';
import getDetailData from '../../utils/getDetailData';
import PageHeading from '../../component/PageHeading';
import {
	ConfirmDialog,
	ControlledDetailFormLayout,
	Section,
	Input,
	Select,
	SwitchControlled,
	BlockPreloader,
	BarPreloader,
	ControlledFormRow,
} from '../../component/ui';
import getOptionsList from '../../utils/getOptionsList';
import transformString from '../../utils/transformString';

interface TagsDetailProps {
	dataItems: TagsItemProps[];
	onSubmit: (method: submitMethodProps, master: TagsItemProps) => Promise<unknown>;
	onDelete: (master: number[]) => Promise<unknown>;
	loading: boolean;
}

const TagsDetail = (props: TagsDetailProps) => {
	const {
		dataItems = [],
		onSubmit,
		onDelete,
		loading,
	} = props;

	const { t } = useTranslation([ 'common', 'form', 'types' ]);
	const params = useParams();
	const navigate = useNavigate();
	const [ detailData, setDetailData ] = useState<TagsItemProps>(null);
	const [ confirmOpen, setConfirmOpen ] = useState<boolean>(false);
	const [ confirmData, setConfirmData ] = useState<(string | number)[]>([]);

	const detailOptions = {
		root: `/admin/app/${routes.tags.path}`,
	};

	const submitHandler = (data: TagsItemProps) => {
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

	useEffect(() => setDetailData(getDetailData('Tags', dataItems, params.id)), [ dataItems, params ]);

	const getOptionsType = useCallback(
		() => getOptionsList(config.options.model.Users.type, t),
		[ detailData ],
	);

	return (
		<>
			<PageHeading
				title={detailData?.id === 'new' ? t('model_new.Tags') : detailData?.name}
				returnTo={detailOptions.root}
				createButtonLabel={t('model_new.Tags')}
				createButtonPath={detailData?.id !== 'new' && `${detailOptions.root}/detail/new`}
			/>
			{loading && <BarPreloader />}
			{detailData ? (
				<ControlledDetailFormLayout
					dataId="TagsDetailForm"
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
														style={{ width: '50%' }}
														{...rest}
													/>
												);
											}}
										/>

									</Section>

									<Section>

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
							form: {
								control,
								register,
								watch,
							},
							lang,
						} = form;

						return (
							<>
								language content {lang}
							</>
						);
					}}
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

export default TagsDetail;