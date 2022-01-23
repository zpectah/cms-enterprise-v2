import React from "react";

import { pageMetaProps } from '../types/page';
import Layout from '../component/Layout';
import UsersModule from '../module/Users';

interface UsersPageProps {}

const UsersPage = ({}: UsersPageProps) => {
	const pageMeta: pageMetaProps = {
		key: 'users',
		title: 'Users page',
		description: 'Description of page ...',
	};

	return (
		<Layout.App meta={pageMeta}>
			<UsersModule />
		</Layout.App>
	);
};

export default UsersPage;