import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';
import {
	Paper,
	Typography,
	Stack,
	Box,
} from '@mui/material';

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

interface newPasswordFormProps {
	token: string;
	password: string;
}

const CreateNewPasswordForm = () => {
	const { t } = useTranslation([ 'form', 'components' ]);
	const params = useParams();
	const [ submitting, setSubmitting ] = useState(false);
	const navigate = useNavigate();
	const { userCreateNewPassword } = useProfile();

	const submitHandler = (data: newPasswordFormProps) => {
		setSubmitting(true);
		const master = _.cloneDeep(data);
		console.log('submitHandler', master);
		return userCreateNewPassword(master).then((resp) => {
			console.log('userCreateNewPassword', resp);
			setSubmitting(false);
		});
	};
	const loginLinkHandler = () => {
		navigate(`/admin/login`);
	};

	useEffect(() => {
		console.log('params', params);
	}, [ params ]);

	return (
		<>
			<Typography
				variant="h3"
				sx={{
					pb: 3.5,
					textAlign: 'center',
				}}
			>
				Create new password
			</Typography>
			<div>
				<ControlledForm
					dataId="CreateNewPasswordForm"
					defaultValues={{
						token: '',
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
									Send request
								</PrimaryButton>
								<Button
									onClick={loginLinkHandler}
								>
									Back to login
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
			</div>
		</>
	);
};

export default CreateNewPasswordForm;
