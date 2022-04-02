import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';

import config from '../../config';
import routes from '../../routes';
import useSettings from '../../hooks/useSettings';
import { useMenu } from '../../hooks/model';
import { MenuItemProps } from '../../types/model';
import { submitMethodProps, entityActionsType } from '../../types/common';
import PageHeading from '../../component/PageHeading';
import MenuItemsManager from '../MenuItems/MenuItemsManager';
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
import {
	getDetailData,
	getOptionsList,
	transformString,
} from '../../utils';

interface MenuDetailProps {
	dataItems: MenuItemProps[];
	onSubmit: (method: submitMethodProps, master: MenuItemProps) => Promise<unknown>;
	onDelete: (master: number[]) => Promise<unknown>;
	loading: boolean;
	actions: entityActionsType;
}

const MenuDetail = (props: MenuDetailProps) => {
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
	const [ detailData, setDetailData ] = useState<MenuItemProps>(null);
	const [ confirmOpen, setConfirmOpen ] = useState<boolean>(false);
	const [ confirmData, setConfirmData ] = useState<(string | number)[]>([]);
	const [ submitting, setSubmitting ] = useState(false);
	const { settings } = useSettings();
	const { checkMenuDuplicates } = useMenu();
	const languageActive = settings?.language_active;

	const detailOptions = {
		root: `/admin/app/${routes.menu.path}`,
	};

	const submitHandler = (data: MenuItemProps) => {
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
			'Menu',
			dataItems,
			params.id,
			languageActive,
			{
				label: '',
			},
		)),
		[ dataItems, params, languageActive ],
	);

	const getOptionsType = useCallback(
		() => getOptionsList(config.options.model.Menu.type, t),
		[ detailData ],
	);

	return (
		<>
			<PageHeading
				title={detailData?.id === 'new' ? t('model_new.Menu') : detailData?.name}
				returnTo={detailOptions.root}
				createButtonLabel={t('model_new.Menu')}
				createButtonPath={`${detailOptions.root}/detail/new`}
			/>
			{loading && <BarPreloader />}
			{detailData ? (
				<ControlledDetailFormLayout
					mandatoryInfo
					dataId="MenuDetailForm"
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
						const duplicates = checkMenuDuplicates(
							detailData.id as number,
							watchName,
						);

						useEffect(() => setExternalError(duplicates), [ duplicates ]);

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

							</>
						);
					}}
					renderAddons={() => (
						<MenuItemsManager
							menuId={detailData.id as number}
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

export default MenuDetail;
