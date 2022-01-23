import React from 'react';

import { pageMetaProps } from '../types/page';
import routes from '../routes';
import Layout from '../component/Layout';
import LoginModule from '../module/Login';

interface LoginPageProps {}

const LoginPage = ({}: LoginPageProps) => {
	const pageMeta: pageMetaProps = routes.login;

	return (
		<Layout.Minimal meta={pageMeta} withOptions>
			<LoginModule />
		</Layout.Minimal>
	);
};

export default LoginPage;
