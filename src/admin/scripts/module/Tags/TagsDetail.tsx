import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';

import config from '../../config';
import routes from '../../routes';
import { useTags } from '../../hooks/model';
import { TagsItemProps } from '../../types/model';
import { submitMethodProps, entityActionsType } from '../../types/common';
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
	ColorPicker,
} from '../../component/ui';
import {
	getDetailData,
	getOptionsList,
	transformString,
} from '../../utils';

interface TagsDetailProps {
	dataItems: TagsItemProps[];
	onSubmit: (method: submitMethodProps, master: TagsItemProps) => Promise<unknown>;
	onDelete: (master: number[]) => Promise<unknown>;
	loading: boolean;
	actions: entityActionsType;
}

const TagsDetail = (props: TagsDetailProps) => {
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
	const [ detailData, setDetailData ] = useState<TagsItemProps>(null);
	const [ confirmOpen, setConfirmOpen ] = useState<boolean>(false);
	const [ confirmData, setConfirmData ] = useState<(string | number)[]>([]);
	const [ submitting, setSubmitting ] = useState(false);
	const { checkTagsDuplicates } = useTags();

	const detailOptions = {
		root: `/admin/app/${routes.tags.path}`,
	};

	const submitHandler = (data: TagsItemProps) => {
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

	useEffect(() => setDetailData(getDetailData('Tags', dataItems, params.id)), [ dataItems, params ]);

	const options_type = useMemo(() => getOptionsList(config.options.model.Users.type, t), [ detailData ]);

	return (
		<>
			<PageHeading
				title={detailData?.id === 'new' ? t('model_new.Tags') : detailData?.name}
				returnTo={detailOptions.root}
				createButtonLabel={t('model_new.Tags')}
				createButtonPath={`${detailOptions.root}/detail/new`}
			/>
			{loading && <BarPreloader />}
			{detailData ? (
				<ControlledDetailFormLayout
					mandatoryInfo
					dataId="TagsDetailForm"
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
						const watchName = watch('name');
						const duplicates = checkTagsDuplicates(
							detailData.id as number,
							watchName,
						);

						useEffect(() => setExternalError(duplicates), [ duplicates ]);

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
										<ControlledFormRow
											name="color"
											control={control}
											rules={{ required: true }}
											defaultValue={detailData.color}
											render={({ field, fieldState }) => {
												const { value, onChange } = field;
												const { error } = fieldState;

												return (
													<>
														<ColorPicker
															label={t('form:label.color')}
															placeholder={t('form:placeholder.color')}
															id={`${token}_color`}
															value={value}
															onChange={onChange}
															error={!!error}
															required
														/>
													</>
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

export default TagsDetail;
