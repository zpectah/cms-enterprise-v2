import React from 'react';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';

import { EMAIL_REGEX } from '../../constants';
import {
	ControlledForm,
	ControlledFormRow,
	Input,
	PasswordInput,
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

	const { t } = useTranslation([ 'form' ]);

	const submitHandler = (data: loginFormProps) => {
		const master = _.cloneDeep(data);
		console.log('submitHandler', master);
	};

	return (
		<ControlledForm
			dataId="LoginForm"
			defaultValues={{
				email: '',
				password: '',
			}}
			onSubmit={submitHandler}
			renderMain={(form) => {
				const { token, form: { control } } = form;

				return (
					<div
						style={{
							width: '250px',
						}}
					>

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

					</div>
				);
			}}
		/>
	);
};

export default LoginForm;
