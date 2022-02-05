import React, { Suspense } from 'react';

import { pageMetaProps } from '../types/page';
import routes from '../routes';
import Layout from '../component/Layout';
import { BlockPreloader } from '../component/ui';

const UsersModule = React.lazy(() => import('../module/Users'));

interface UsersPageProps {}

const UsersPage = ({}: UsersPageProps) => {
	const pageMeta: pageMetaProps = routes.users;

	return (
		<Layout.App meta={pageMeta}>
			<Suspense fallback={<BlockPreloader />}>
				<UsersModule />
			</Suspense>
		</Layout.App>
	);
};

export default UsersPage;
