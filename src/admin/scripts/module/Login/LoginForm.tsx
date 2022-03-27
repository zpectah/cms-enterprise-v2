import React from 'react';
import _ from 'lodash';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Stack, Box } from '@mui/material';

import { EMAIL_REGEX } from '../../constants';
import routes from '../../routes';
import {
	ControlledForm,
	ControlledFormRow,
	Input,
	PasswordInput,
	PrimaryButton,
	Button,
} from '../../component/ui';

interface loginFormProps {
	email: string;
	password: string;
}
interface LoginFormProps {
	onSubmit: (master: loginFormProps) => Promise<unknown>;
}

const LoginForm = (props: LoginFormProps) => {
	const {} = props;

	const { t } = useTranslation([ 'form', 'components' ]);
	const navigate = useNavigate();

	const submitHandler = (data: loginFormProps) => {
		const master = _.cloneDeep(data);
		console.log('submitHandler', master);
	};
	const lostPasswordLinkHandler = () => {
		navigate(`/admin/lost-password`);
	};

	return (
		<>
			<ControlledForm
				dataId="LoginForm"
				defaultValues={{
					email: '',
					password: '',
				}}
				onSubmit={submitHandler}
				renderActions={(form) => {
					const { form: { formState: { isValid } } } = form;

					return (
						<Stack
							spacing={2}
							direction="row"
							alignItems="center"
							justifyContent="center"
						>
							<PrimaryButton
								type="submit"
								disabled={!isValid}
							>
								Log in
							</PrimaryButton>
							<Button
								onClick={lostPasswordLinkHandler}
							>
								Lost password
							</Button>
						</Stack>
					);
				}}
				disableActionsOffset
				renderMain={(form) => {
					const { token, form: { control } } = form;

					return (
						<>

							<ControlledFormRow
								name="email"
								control={control}
								rules={{ pattern: EMAIL_REGEX, required: true }}
								defaultValue={''}
								render={({ field, fieldState }) => {
									const { ref, ...rest } = field;
									const { error } = fieldState;

									return (
										<Input
											type="email"
											label={t('form:label.email')}
											placeholder={t('form:placeholder.email')}
											id={`${token}_email`}
											error={!!error}
											required
											inputRef={ref}
											{...rest}
										/>
									);
								}}
							/>

							<ControlledFormRow
								name="password"
								control={control}
								rules={{ required: true }}
								defaultValue={''}
								render={({ field, fieldState }) => {
									const { ref, ...rest } = field;
									const { error } = fieldState;

									return (
										<PasswordInput
											label={t('form:label.password')}
											placeholder={t('form:placeholder.password')}
											id={`${token}_password`}
											error={!!error}
											required
											inputRef={ref}
											{...rest}
										/>
									);
								}}
							/>

						</>
					);
				}}
			/>
		</>
	);
};

export default LoginForm;
