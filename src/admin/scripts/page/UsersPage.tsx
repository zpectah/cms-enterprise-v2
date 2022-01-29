import React, { Suspense } from 'react';

import { pageMetaProps } from '../types/page';
import routes from '../routes';
import Layout from '../component/Layout';
import Preloader from '../component/Preloader';

const UsersModule = React.lazy(() => import('../module/Users'));

interface UsersPageProps {}

const UsersPage = ({}: UsersPageProps) => {
	const pageMeta: pageMetaProps = routes.users;

	return (
		<Layout.App meta={pageMeta}>
			<Suspense fallback={<Preloader.Block />}>
				<UsersModule />
			</Suspense>
		</Layout.App>
	);
};

export default UsersPage;
