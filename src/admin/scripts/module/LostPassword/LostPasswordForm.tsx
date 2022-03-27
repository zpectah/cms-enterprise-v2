import React from 'react';
import { useNavigate } from 'react-router-dom';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';
import {
	Paper,
	Typography,
	Stack,
	Box,
} from '@mui/material';

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

interface lostPasswordFormProps {
	email: string;
}
interface LostPasswordFormProps {}

const LostPasswordForm = (props: LostPasswordFormProps) => {
	const {} = props;

	const { t } = useTranslation([ 'form', 'components' ]);
	const navigate = useNavigate();

	const submitHandler = (data: lostPasswordFormProps) => {
		const master = _.cloneDeep(data);
		console.log('submitHandler', master);
	};
	const loginLinkHandler = () => {
		navigate(`/admin/login`);
	};

	return (
		<>
			<Typography
				variant="h2"
				sx={{
					pb: 3.5,
					textAlign: 'center',
				}}
			>
				Lost password
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
									disabled={!isValid}
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

							</>
						);
					}}
				/>
			</div>
		</>
	);
};

export default LostPasswordForm;
