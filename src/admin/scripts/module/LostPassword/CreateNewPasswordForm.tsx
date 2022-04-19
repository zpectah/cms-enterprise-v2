import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';
import {
	Typography,
	Stack,
	Alert,
} from '@mui/material';

import useProfile from '../../hooks/useProfile';
import {
	ControlledForm,
	ControlledFormRow,
	PasswordInput,
	PrimaryButton,
	Button,
	CmsLogo,
} from '../../component/ui';

interface newPasswordFormProps {
	token: string;
	password: string;
}

const CreateNewPasswordForm = () => {
	const { t } = useTranslation([ 'form', 'components' ]);
	const params = useParams();
	const [ submitting, setSubmitting ] = useState(false);
	const [ submitted, setSubmitted ] = useState(false);
	const [ responseMessage, setResponseMessage ] = useState(null);
	const navigate = useNavigate();
	const { userCreateNewPassword } = useProfile();

	const submitHandler = (data: newPasswordFormProps) => {
		setSubmitting(true);
		setResponseMessage(null);
		const master = _.cloneDeep(data);
		return userCreateNewPassword(master).then((resp) => {
			setResponseMessage(resp.data.message);
			setSubmitting(false);
			setSubmitted(true);
		});
	};
	const loginLinkHandler = () => {
		navigate(`/admin/login`);
	};

	return (
		<>
			<Stack
				direction="row"
				alignItems="center"
				justifyContent="center"
				sx={{
					mb: 2,
				}}
			>
				<CmsLogo />
			</Stack>
			<Typography
				variant="h3"
				sx={{
					pb: 3.5,
					textAlign: 'center',
				}}
			>
				{t('components:CreateNewPasswordForm.title')}
			</Typography>
			<div>
				<ControlledForm
					dataId="CreateNewPasswordForm"
					defaultValues={{
						token: params?.token,
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
									disabled={!isValid || submitted}
									loading={submitting}
								>
									{t('components:CreateNewPasswordForm.btn.submit')}
								</PrimaryButton>
								<Button
									onClick={loginLinkHandler}
								>
									{t('components:CreateNewPasswordForm.btn.return_login')}
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
								{responseMessage && (
									<Alert
										severity={responseMessage === 'user_password_reset_success' ? 'success' : 'error'}
										sx={{ mb: 2 }}
									>
										{t(`components:CreateNewPasswordForm.message.${responseMessage}`)}
									</Alert>
								)}
							</>
						);
					}}
				/>
			</div>
		</>
	);
};

export default CreateNewPasswordForm;
