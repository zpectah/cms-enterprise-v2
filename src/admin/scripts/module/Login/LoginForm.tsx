import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';
import { Stack, Alert, Typography } from '@mui/material';

import { EMAIL_REGEX } from '../../constants';
import useProfile from '../../hooks/useProfile';
import useSettings from '../../hooks/useSettings';
import useToasts from '../../hooks/useToasts';
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
	const { onSubmit } = props;

	const { t } = useTranslation([ 'form', 'components', 'messages' ]);
	const navigate = useNavigate();
	const { createErrorToast } = useToasts();
	const { profile } = useProfile();
	const { settings } = useSettings();
	const [ submitting, setSubmitting ] = useState(false);
	const [ responseMessage, setResponseMessage ] = useState(null);
	const [ responseStatus, setResponseStatus ] = useState(null);

	const submitHandler = (data: loginFormProps) => {
		setSubmitting(true);
		setResponseMessage(null);
		setResponseStatus(null);
		const master = _.cloneDeep(data);
		return onSubmit(master).then((resp: { data: any }) => {
			const type = resp?.data?.message;
			let key = 'unknown';
			switch (type) {

				case 'user_not_found':
					setResponseStatus('info');
					key = type;
					break;

				case 'user_password_not_match':
					setResponseStatus('error');
					key = type;
					break;

				case 'user_not_active':
					setResponseStatus('error');
					key = type;
					break;

				case 'user_is_deleted':
					setResponseStatus('error');
					key = type;
					break;

				case 'user_login_success':
					setResponseStatus('success');
					key = type;
					setTimeout(() => window.location.href = '/admin/app#loginSuccess', 1000);
					break;

			}
			setResponseMessage(t(`components:LoginForm.message.${key}`));
			setSubmitting(false);
		});
	};
	const lostPasswordLinkHandler = () => {
		navigate(`/admin/lost-password`);
	};
	const returnToAppLinkHandler = () => {
		navigate(`/admin/app`);
	};

	useEffect(() => {
		if (window.location.hash) {
			if (window.location.hash === '#unauthorizedAccess') {
				createErrorToast({
					title: t('messages:profile.unauthorized_access')
				});
				navigate(`/admin/login`);
			}
		}
	}, [ window.location.hash ]);

	return (
		<>
			<Typography
				sx={{
					pb: 1.5,
					textAlign: 'center',
				}}
			>
				{settings?.web_meta_title}
			</Typography>
			<Typography
				variant="h3"
				sx={{
					pb: 3.5,
					textAlign: 'center',
				}}
			>
				{t('components:LoginForm.title')}
			</Typography>
			{profile?.id ? (
				<div
					style={{
						textAlign: 'center',
					}}
				>
					<Alert
						severity="info"
						sx={{
							mb: 3,
							textAlign: 'left',
						}}
					>
						{t('components:LoginForm.message.already_loggedIn')}
					</Alert>
					<Button
						onClick={returnToAppLinkHandler}
						variant="outlined"
					>
						{t('components:LoginForm.btn.return_app')}
					</Button>
				</div>
			) : (
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
							<>
								{(responseMessage && responseStatus) && (
									<Alert
										severity={responseStatus}
										sx={{
											mt: 3,
											mb: 3,
										}}
									>
										{responseMessage}
									</Alert>
								)}
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
							</>
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
			)}
		</>
	);
};

export default LoginForm;
