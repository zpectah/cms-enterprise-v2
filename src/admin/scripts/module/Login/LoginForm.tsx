import React from 'react';
import _ from 'lodash';

import { ControlledForm } from '../../component/ui';

interface LoginFormProps {
	onSubmit: (master: any) => Promise<unknown>;
}

const LoginForm = (props: LoginFormProps) => {
	const {} = props;

	const submitHandler = (data: any) => {
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
					<div>
						LoginForm
					</div>
				);
			}}
		/>
	);
};

export default LoginForm;
