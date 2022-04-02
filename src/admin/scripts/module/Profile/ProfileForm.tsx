import React, { useState } from 'react';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';
import { Box, Stack, Typography } from '@mui/material';

import {
	ControlledForm,
	ControlledFormRow,
	Input,
	PasswordInput,
	Textarea,
	Section,
	PrimaryButton,
	FormRow,
	BarPreloader,
	Chip,
} from '../../component/ui';
import { USER_LEVEL_NAMES } from '../../constants';
import ThemeToggle from '../../component/ThemeToggle';
import LanguageToggle from '../../component/LanguageToggle';
import { profileProps } from '../../types/profile';
import AvatarPicker from '../../component/AvatarPicker';

interface ProfileFormProps {
	data: profileProps;
	onSubmit: (master: profileProps) => Promise<unknown>;
	loading: boolean;
	viewable: boolean;
	editable: boolean;
}

const ProfileForm = (props: ProfileFormProps) => {
	const {
		data,
		onSubmit,
		loading,
		viewable,
		editable,
	} = props;

	const { t } = useTranslation([ 'form', 'components', 'types' ]);
	const [ submitting, setSubmitting ] = useState(false);

	const submitHandler = (data: profileProps) => {
		setSubmitting(true);
		const master = _.cloneDeep(data);
		onSubmit(master).then(() => {
			setSubmitting(false);
		});
	};

	return (
		<>
			{loading && <BarPreloader />}
			<ControlledForm
				mandatoryInfo
				viewable={viewable}
				editable={editable}
				dataId="ProfileForm"
				defaultValues={{
					...data,
					password: '',
				}}
				onSubmit={submitHandler}
				renderActions={(form) => {
					const { form: { formState: { isValid } } } = form;

					return (
						<>
							<PrimaryButton
								type="submit"
								disabled={!isValid}
								loading={submitting}
							>
								{t('components:ProfileForm.submit')}
							</PrimaryButton>
						</>
					);
				}}
				renderMain={(form) => {
					const { token, form: { control, getValues, setValue } } = form;

					return (
						<>
							<Section>
								<FormRow
									emptyLabel
								>
									<Stack
										direction="row"
										alignItems="center"
										justifyContent="flex-start"
										spacing={2}
									>
										<AvatarPicker
											src={getValues('img_avatar')}
											onChange={(blob) => {
												console.log('on change', blob);
												setValue('img_avatar', blob);
											}}
										/>
										<Stack
											spacing={2}
										>
											<Stack
												spacing={1}
											>
												<Typography variant="h3">
													{(data.name_first && data.name_last) ? (
														<>
															{data.name_first} {data.name_last}
														</>
													) : (
														<>
															{data.nickname}
														</>
													)}
												</Typography>
												<Typography>
													{data.email}
												</Typography>
												<Stack
													direction="row"
													spacing={1}
												>
													<Chip
														label={t(`types:${USER_LEVEL_NAMES[data.item_level]}`)}
														color="primary"
														variant="outlined"
														size="small"
													/>
													<Chip
														label={t(`types:${data.item_group}`)}
														variant="outlined"
														size="small"
													/>
												</Stack>
											</Stack>
										</Stack>
									</Stack>
								</FormRow>
							</Section>
							<Section divider>

								<FormRow
									label={t('components:ProfileForm.label.language')}
								>
									<LanguageToggle />
								</FormRow>

								<FormRow
									label={t('components:ProfileForm.label.theme')}
								>
									<ThemeToggle />
								</FormRow>

							</Section>
							<Section>

								<ControlledFormRow
									name="password"
									control={control}
									rules={{}}
									defaultValue={''}
									rowProps={{
										label: t('form:label.password_new'),
										id: `${token}_password`,
									}}
									render={({ field, fieldState }) => {
										const { ref, ...rest } = field;
										const { error } = fieldState;

										return (
											<PasswordInput
												placeholder={t('form:placeholder.password_new')}
												id={`${token}_password`}
												error={!!error}
												inputRef={ref}
												sx={{ width: { xs: '100%', md: '75%', lg: '50%' } }}
												{...rest}
											/>
										);
									}}
								/>

							</Section>
							<Section>

								<ControlledFormRow
									name="nickname"
									control={control}
									rules={{ required: true }}
									defaultValue={''}
									rowProps={{
										label: t('form:label.nickname'),
										id: `${token}_nickname`,
									}}
									render={({ field, fieldState }) => {
										const { ref, ...rest } = field;
										const { error } = fieldState;

										return (
											<Input
												placeholder={t('form:placeholder.nickname')}
												id={`${token}_nickname`}
												error={!!error}
												required
												inputRef={ref}
												sx={{ width: { xs: '100%', md: '75%' } }}
												{...rest}
											/>
										);
									}}
								/>
								<ControlledFormRow
									name="name_first"
									control={control}
									rules={{}}
									defaultValue={''}
									rowProps={{
										label: t('form:label.name_first'),
										id: `${token}_name_first`,
									}}
									render={({ field, fieldState }) => {
										const { ref, ...rest } = field;
										const { error } = fieldState;

										return (
											<Input
												placeholder={t('form:placeholder.name_first')}
												id={`${token}_name_first`}
												error={!!error}
												inputRef={ref}
												sx={{ width: { xs: '100%', md: '75%' } }}
												{...rest}
											/>
										);
									}}
								/>
								<ControlledFormRow
									name="name_last"
									control={control}
									rules={{}}
									defaultValue={''}
									rowProps={{
										label: t('form:label.name_last'),
										id: `${token}_name_last`,
									}}
									render={({ field, fieldState }) => {
										const { ref, ...rest } = field;
										const { error } = fieldState;

										return (
											<Input
												placeholder={t('form:placeholder.name_last')}
												id={`${token}_name_last`}
												error={!!error}
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
									name="description"
									control={control}
									rules={{}}
									defaultValue={''}
									rowProps={{
										label: t('form:label.description'),
										id: `${token}_description`,
									}}
									render={({ field, fieldState }) => {
										const { ref, ...rest } = field;
										const { error } = fieldState;

										return (
											<Textarea
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
	);
};

export default ProfileForm;
