import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';
import {
	Typography,
	Stack,
	Alert,
} from '@mui/material';

import { EMAIL_REGEX } from '../../constants';
import useProfile from '../../hooks/useProfile';
import useSettings from '../../hooks/useSettings';
import {
	ControlledForm,
	ControlledFormRow,
	Input,
	PrimaryButton,
	Button,
	CmsLogo,
} from '../../component/ui';

interface lostPasswordFormProps {
	email: string;
}

const LostPasswordForm = () => {
	const { t } = useTranslation([ 'form', 'components' ]);
	const [ submitting, setSubmitting ] = useState(false);
	const [ submitted, setSubmitted ] = useState(false);
	const [ responseMessage, setResponseMessage ] = useState(null);
	const navigate = useNavigate();
	const { userLostPassword } = useProfile();
	const { settings } = useSettings();

	const submitHandler = (data: lostPasswordFormProps) => {
		setSubmitting(true);
		setResponseMessage(null);
		const master = _.cloneDeep(data);
		return userLostPassword(master).then((resp) => {
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
					pb: 1.5,
					textAlign: 'center',
				}}
			>
				{t('components:LostPasswordForm.title')}
			</Typography>
			<Typography
				sx={{
					pb: 3.5,
					textAlign: 'center',
				}}
			>
				{settings?.web_meta_title}
			</Typography>
			<div>
				<ControlledForm
					dataId="LostPasswordForm"
					defaultValues={{
						email: '',
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
									{t('components:LostPasswordForm.btn.submit')}
								</PrimaryButton>
								<Button
									onClick={loginLinkHandler}
								>
									{t('components:LostPasswordForm.btn.return_login')}
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
								{responseMessage && (
									<Alert
										severity={responseMessage === 'request_was_send' ? 'success' : 'error'}
										sx={{ mb: 2 }}
									>
										{t(`components:LostPasswordForm.message.${responseMessage}`)}
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

export default LostPasswordForm;
