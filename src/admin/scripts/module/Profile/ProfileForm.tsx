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
} from '../../component/ui';
import ThemeToggle from '../../component/ThemeToggle';
import LanguageToggle from '../../component/LanguageToggle';
import { UsersItemProps } from '../../types/model';

interface ProfileFormProps {
	model: UsersItemProps;
}

const ProfileForm = (props: ProfileFormProps) => {
	const { model } = props;

	const { t } = useTranslation([ 'form' ]);

	return (
		<div>

			<Section>

				<div>avatar & email ...</div>

				<div>

					<button>
						Log out - confirm
					</button>

				</div>

			</Section>

			<ControlledForm
				dataId="ProfileForm"
				defaultValues={{
					email: model.email,
					password: '',
					nickname: model.nickname,
					name_first: model.name_first,
					name_last: model.name_last,
					description: model.description,
				}}
				onSubmit={() => { console.log('form update') }}
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
									render={({ field, fieldState }) => {
										const { ref, ...rest } = field;
										const { error } = fieldState;

										return (
											<PasswordInput
												label={t('form:label.password_new')}
												placeholder={t('form:placeholder.password_new')}
												id={`${token}_password`}
												error={!!error}
												inputRef={ref}
												{...rest}
											/>
										);
									}}
								/>

							</Section>
							<Section noSpacing>

								<ControlledFormRow
									name="nickname"
									control={control}
									rules={{ required: true }}
									defaultValue={''}
									render={({ field, fieldState }) => {
										const { ref, ...rest } = field;
										const { error } = fieldState;

										return (
											<Input
												label={t('form:label.nickname')}
												placeholder={t('form:placeholder.nickname')}
												id={`${token}_nickname`}
												error={!!error}
												required
												inputRef={ref}
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
									render={({ field, fieldState }) => {
										const { ref, ...rest } = field;
										const { error } = fieldState;

										return (
											<Input
												label={t('form:label.name_first')}
												placeholder={t('form:placeholder.name_first')}
												id={`${token}_name_first`}
												error={!!error}
												inputRef={ref}
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
									render={({ field, fieldState }) => {
										const { ref, ...rest } = field;
										const { error } = fieldState;

										return (
											<Input
												label={t('form:label.name_last')}
												placeholder={t('form:placeholder.name_last')}
												id={`${token}_name_last`}
												error={!!error}
												inputRef={ref}
												{...rest}
											/>
										);
									}}
								/>
								<ControlledFormRow
									name="description"
									control={control}
									rules={{}}
									defaultValue={''}
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
							<Section>

								<PrimaryButton
									type="submit"
								>
									Update profile
								</PrimaryButton>

							</Section>
						</>
					);
				}}
			/>

			<Section>
				<LanguageToggle />
				<br />
				<br />
				<ThemeToggle />
			</Section>

		</div>
	);
};

export default ProfileForm;
