import React, { useCallback, useEffect } from 'react';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';
import { Stack } from '@mui/material';

import config from '../../config';
import { EMAIL_REGEX } from '../../constants';
import { useVisitorBlacklist } from '../../hooks/model';
import { VisitorBlacklistItemProps } from '../../types/model';
import {
	Dialog,
	ControlledForm,
	ControlledFormRow,
	Input,
	Section,
	Select,
	Textarea,
	PrimaryButton,
	Button,
} from '../../component/ui';
import { getOptionsList } from '../../utils';

export interface VisitorBlacklistDetailProps {
	open: boolean;
	onClose: () => void;
	detailData: VisitorBlacklistItemProps | null;
	onSubmit: (master: VisitorBlacklistItemProps) => Promise<unknown>;
}

const VisitorBlacklistDetail = (props: VisitorBlacklistDetailProps) => {
	const {
		open,
		onClose,
		detailData,
		onSubmit,
	} = props;

	const { t } = useTranslation([ 'common', 'components' ]);
	const {
		checkVisitorBlacklistDuplicatesName,
		checkVisitorBlacklistDuplicatesIp,
	} = useVisitorBlacklist();

	const submitHandler = (data: VisitorBlacklistItemProps) => {
		const master = _.cloneDeep(data);
		return onSubmit(master);
	};

	const getOptionsType = useCallback(
		() => getOptionsList(config.options.model.VisitorBlacklist.type, t),
		[ detailData ],
	);

	return (
		<>
			<Dialog
				open={open}
				onClose={onClose}
				title={detailData?.id === 'new' ? t('components:VisitorBlacklistDetail.title') : detailData?.visitor_email || detailData?.visitor_ip}
				showBodyClose
			>
				{detailData ? (
					<>
						<ControlledForm
							dataId="VisitorBlacklistDetailForm"
							defaultValues={detailData}
							onSubmit={submitHandler}
							renderActions={(form) => {
								const { form: { formState: { isValid } }, externalError } = form;

								return (
									<Stack
										direction="row"
										alignItems="center"
										justifyContent="flex-start"
										spacing={2}
									>
										<PrimaryButton
											type="submit"
											disabled={!isValid || externalError}
										>
											{t(detailData.id === 'new' ? 'btn.create' : 'btn.save_changes')}
										</PrimaryButton>
										<Button>
											{t('btn.cancel')}
										</Button>
									</Stack>
								);
							}}
							renderMain={(form) => {
								const { token, form: { control, watch }, setExternalError } = form;
								const watchEmail = watch('visitor_email');
								const watchIp = watch('visitor_ip');
								const duplicates_email = checkVisitorBlacklistDuplicatesName(
									detailData.id as number,
									watchEmail,
								);
								const duplicates_ip = checkVisitorBlacklistDuplicatesIp(
									detailData.id as number,
									watchIp,
								);
								const duplicates = duplicates_email || duplicates_ip;

								useEffect(() => setExternalError(duplicates), [ duplicates ]);

								return (
									<>
										<Section
											style={{
												paddingTop: '1rem',
											}}
										>
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
												name="visitor_email"
												control={control}
												rules={{ pattern: EMAIL_REGEX, required: watchIp === '' }}
												defaultValue={detailData.visitor_email}
												rowProps={{
													errors: duplicates_email && [ 'visitor_email' ]
												}}
												render={({ field, fieldState }) => {
													const { ref, ...rest } = field;
													const { error } = fieldState;

													return (
														<Input
															type="email"
															label={t('form:label.email')}
															placeholder={t('form:placeholder.email')}
															id={`${token}_visitor_email`}
															error={!!error || duplicates_email}
															required={watchIp === ''}
															inputRef={ref}
															sx={{ width: { xs: '100%', md: '75%' } }}
															{...rest}
														/>
													);
												}}
											/>
											<ControlledFormRow
												name="visitor_ip"
												control={control}
												rules={{ required: watchEmail === '' }}
												defaultValue={detailData.visitor_ip}
												rowProps={{
													errors: duplicates_ip && [ 'visitor_ip' ]
												}}
												render={({ field, fieldState }) => {
													const { ref, ...rest } = field;
													const { error } = fieldState;

													return (
														<Input
															label={t('form:label.ip')}
															placeholder={t('form:placeholder.ip')}
															id={`${token}_visitor_ip`}
															error={!!error || duplicates_ip}
															required={watchEmail === ''}
															inputRef={ref}
															sx={{ width: { xs: '100%', md: '75%' } }}
															{...rest}
														/>
													);
												}}
											/>
											<ControlledFormRow
												name="cause"
												control={control}
												rules={{ required: true }}
												defaultValue={detailData.cause}
												render={({ field, fieldState }) => {
													const { ref, ...rest } = field;
													const { error } = fieldState;

													return (
														<Input
															label={t('form:label.cause')}
															placeholder={t('form:placeholder.cause')}
															id={`${token}_cause`}
															error={!!error}
															required
															inputRef={ref}
															{...rest}
														/>
													);
												}}
											/>
										</Section>
										<Section noSpacing>
											<ControlledFormRow
												name="description"
												control={control}
												rules={{}}
												defaultValue={detailData.description}
												render={({ field, fieldState }) => {
													const { ref, ...rest } = field;
													const { error } = fieldState;

													return (
														<Textarea
															label={t('form:label.description')}
															placeholder={t('form:placeholder.description')}
															id={`${token}_description`}
															error={!!error}
															inputRef={ref}
															rows={6}
															{...rest}
														/>
													);
												}}
											/>
										</Section>
									</>
								);
							}}
						/>
					</>
				) : (
					<></>
				)}
			</Dialog>
		</>
	);
};

export default VisitorBlacklistDetail;
