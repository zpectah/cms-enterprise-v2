import React from 'react';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';

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
} from '../../component/ui';
import ThemeToggle from '../../component/ThemeToggle';
import LanguageToggle from '../../component/LanguageToggle';
import { profileProps } from '../../types/profile';

interface ProfileFormProps {
	data: profileProps;
	onSubmit: (master: profileProps) => Promise<unknown>;
	loading: boolean;
}

const ProfileForm = (props: ProfileFormProps) => {
	const {
		data,
		onSubmit,
		loading,
	} = props;

	const { t } = useTranslation([ 'form', 'components' ]);

	const submitHandler = (data: profileProps) => {
		const master = _.cloneDeep(data);
		console.log('submitHandler', master);
		onSubmit(master).then((resp) => {
			console.info('After submit', master, resp);
		});
	};

	return (
		<>
			{loading && <BarPreloader />}
			<Section>

				<FormRow
					emptyLabel
				>

					<div>avatar & email ...</div>

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
			<ControlledForm
				mandatoryInfo
				dataId="ProfileForm"
				defaultValues={{
					email: data.email,
					password: '',
					nickname: data.nickname,
					name_first: data.name_first,
					name_last: data.name_last,
					description: data.description,
				}}
				onSubmit={submitHandler}
				renderActions={(form) => {
					const { form: { formState: { isValid } } } = form;

					return (
						<>
							<PrimaryButton
								type="submit"
								disabled={!isValid}
							>
								{t('components:ProfileForm.submit')}
							</PrimaryButton>
						</>
					);
				}}
				renderMain={(form) => {
					const { token, form: { control } } = form;

					return (
						<>
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
												sx={{ width: { xs: '100%', md: '75%' } }}
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
