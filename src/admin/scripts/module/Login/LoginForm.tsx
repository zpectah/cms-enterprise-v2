import React, { useState } from 'react';
import _ from 'lodash';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Stack, Box, Typography } from '@mui/material';

import { EMAIL_REGEX } from '../../constants';
import routes from '../../routes';
import useProfile from '../../hooks/useProfile';
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
	const {
		onSubmit,
	} = props;

	const { t } = useTranslation([ 'form', 'components' ]);
	const [ submitting, setSubmitting ] = useState(false);
	const [ responseMessage, setResponseMessage ] = useState(null);
	const [ responseStatus, setResponseStatus ] = useState(null);
	const navigate = useNavigate();

	const submitHandler = (data: loginFormProps) => {
		setSubmitting(true);
		const master = _.cloneDeep(data);
		console.log('submitHandler', master);
		return onSubmit(master).then((resp) => {
			console.log('userLogin: onSubmit', resp);

			setResponseStatus('success');
			setResponseMessage('...');
			setSubmitting(false);
		});
	};
	const lostPasswordLinkHandler = () => {
		navigate(`/admin/lost-password`);
	};

	return (
		<>
			<Typography
				variant="h3"
				sx={{
					pb: 3.5,
					textAlign: 'center',
				}}
			>
				{t('components:LoginForm.title')}
			</Typography>
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
								loading={submitting}
							>
								{t('components:LoginForm.btn.submit')}
							</PrimaryButton>
							<Button
								onClick={lostPasswordLinkHandler}
							>
								{t('components:LoginForm.btn.lost_password')}
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
											size="medium"
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
											size="medium"
											formControlProps={{
												size: 'medium',
											}}
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
