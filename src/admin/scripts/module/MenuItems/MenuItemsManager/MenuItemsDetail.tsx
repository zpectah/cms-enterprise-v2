import React, { useCallback, useEffect } from 'react';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';
import { Box, Stack } from '@mui/material';

import { MenuItemsItemModel } from '../../../types/model/MenuItems';
import { useMenuItems } from '../../../hooks/model';
import {
	Dialog,
	ControlledForm,
	ControlledFormRow,
	Input,
	BlockPreloader,
	Section,
	Select,
	PrimaryButton,
	Button,
	LanguageFieldset, SwitchControlled,
} from '../../../component/ui';
import {
	PagesPicker,
	MenuItemsPicker,
} from '../../../component/Picker';
import { getOptionsList, transformString } from '../../../utils';
import config from '../../../config';

export interface MenuItemsDetailProps {
	open: boolean;
	onClose: () => void;
	detailData: MenuItemsItemModel | null;
	menuId: number;
	onSubmit: (master: MenuItemsItemModel) => Promise<unknown>;
}

const MenuItemsDetail = (props: MenuItemsDetailProps) => {
	const {
		open,
		onClose,
		detailData,
		menuId,
		onSubmit,
	} = props;

	const { t } = useTranslation([ 'common', 'form', 'components' ]);
	const { checkMenuItemsDuplicates } = useMenuItems();

	const submitHandler = (data: MenuItemsItemModel) => {
		const master = _.cloneDeep(data);
		master.name = transformString(master.name, 'empty-to-dash');
		master.menu_id = menuId;
		onSubmit(master).then(() => {
			onClose();
		});
	};

	const getOptionsType = useCallback(
		() => getOptionsList(config.options.model.MenuItems.type, t),
		[ detailData ],
	);

	return (
		<Dialog
			open={open}
			onClose={onClose}
			title={detailData.id === 'new' ? t('components:MenuItemsManager.dialog_title') : detailData.name}
			showBodyClose
		>
			{detailData ? (
				<ControlledForm
					dataId="MenuItemsDetailForm"
					defaultValues={detailData}
					onSubmit={submitHandler}
					renderActions={({ form: { formState: { isValid } } }) => (
						<Stack
							direction="row"
							spacing={2}
						>
							<PrimaryButton
								type="submit"
								disabled={!isValid}
							>
								{t(detailData.id === 'new' ? 'btn.create' : 'btn.update')}
							</PrimaryButton>
							<Button
								onClick={onClose}
							>
								{t('btn.cancel')}
							</Button>
						</Stack>
					)}
					renderMain={(form) => {
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
						const duplicates = checkMenuItemsDuplicates(
							detailData.id as number,
							watchName,
						);

						useEffect(() => setExternalError(duplicates), [ duplicates ]);

						return (
							<Box
								sx={{ pt: 1 }}
							>
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
									{watchType === 'page' ? (
										<ControlledFormRow
											name="page_id"
											control={control}
											rules={{ required: watchType === 'page' }}
											defaultValue={detailData.page_id}
											render={({ field, fieldState }) => {
												const { value, onChange } = field;
												const { error } = fieldState;

												return (
													<PagesPicker
														value={value}
														onChange={onChange}
														label={t('form:label.page')}
														placeholder={t('form:placeholder.page')}
														id={`${token}_page_id`}
														error={!!error}
														required={watchType === 'page'}
														disabled={watchType !== 'page'}
														emptyValueOption
														inputSx={{ width: { xs: '100%', md: '250px' } }}
													/>
												);
											}}
										/>
									) : (
										<ControlledFormRow
											name="path_url"
											control={control}
											rules={{ required: watchType !== 'page' }}
											defaultValue={detailData.path_url}
											render={({ field, fieldState }) => {
												const { ref, ...rest } = field;
												const { error } = fieldState;

												return (
													<Input
														label={t('form:label.path_url')}
														placeholder={t('form:placeholder.path_url')}
														id={`${token}_path_url`}
														error={!!error}
														required={watchType !== 'page'}
														inputRef={ref}
														disabled={watchType === 'page'}
														sx={{ width: { xs: '100%', md: '100%' } }}
														{...rest}
													/>
												);
											}}
										/>
									)}
								</Section>

								<Section>

									<LanguageFieldset
										render={(lang) => (
											<ControlledFormRow
												name={`lang.${lang}.label`}
												control={control}
												rules={{ required: true }}
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
															required
															sx={{ width: { xs: '100%', md: '75%' } }}
															{...rest}
														/>
													);
												}}
											/>
										)}
									/>

								</Section>

								<Section>
									<ControlledFormRow
										name="link_custom_key"
										control={control}
										rules={{}}
										defaultValue={detailData.link_custom_key}
										render={({ field, fieldState }) => {
											const { ref, ...rest } = field;
											const { error } = fieldState;

											return (
												<Input
													label={t('form:label.custom_key')}
													placeholder={t('form:placeholder.custom_key')}
													id={`${token}_link_custom_key`}
													error={!!error}
													inputRef={ref}
													sx={{ width: { xs: '100%', md: '50%' } }}
													{...rest}
												/>
											);
										}}
									/>
									<ControlledFormRow
										name="parent"
										control={control}
										rules={{}}
										defaultValue={detailData.parent}
										render={({ field, fieldState }) => {
											const { value, onChange } = field;
											const { error } = fieldState;

											return (
												<MenuItemsPicker
													value={value}
													onChange={onChange}
													label={t('form:label.parent')}
													placeholder={t('form:placeholder.parent')}
													id={`${token}_parent`}
													error={!!error}
													emptyValueOption
													inputSx={{ width: { xs: '100%', md: '250px' } }}
													ignored={[ detailData.id as number ]}
												/>
											);
										}}
									/>

									<ControlledFormRow
										name="item_order"
										control={control}
										rules={{ required: true }}
										defaultValue={detailData.item_order}
										render={({ field, fieldState }) => {
											const { ref, ...rest } = field;
											const { error } = fieldState;

											return (
												<Input
													type="number"
													label={t('form:label.order')}
													placeholder={t('form:placeholder.order')}
													id={`${token}_order`}
													error={!!error}
													required
													inputRef={ref}
													sx={{ width: { xs: '100%', md: '250px' } }}
													{...rest}
												/>
											);
										}}
									/>

								</Section>

								<Section noSpacing>

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

							</Box>
						);
					}}
				/>
			) : (
				<BlockPreloader />
			)}
		</Dialog>
	);
};

export default MenuItemsDetail;
