import React from 'react';

import { pageMetaProps } from '../types/page';
import routes from '../routes';
import Layout from '../component/Layout';
import UsersModule from '../module/Users';

interface UsersPageProps {}

const UsersPage = ({}: UsersPageProps) => {
	const pageMeta: pageMetaProps = routes.users;

	return (
		<Layout.App meta={pageMeta}>
			<UsersModule />
		</Layout.App>
	);
};

export default UsersPage;
