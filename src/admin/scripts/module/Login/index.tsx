import React from 'react';

import useProfile from '../../hooks/useProfile';
import LoginForm from './LoginForm';

interface LoginModuleProps {}

const LoginModule = (props: LoginModuleProps) => {
	const {} = props;

	const {
		profile,
		userLogin,
	} = useProfile();

	const submitHandler = (master) => {
		return userLogin(master).then((resp) => {

			return resp;
		});
	};

	return (
		<div>
			<div>...</div>
			<LoginForm
				onSubmit={submitHandler}
			/>
		</div>
	);
};

export default LoginModule;
