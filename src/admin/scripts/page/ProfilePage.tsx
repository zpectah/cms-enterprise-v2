import React, { Suspense } from 'react';

import { pageMetaProps } from '../types/page';
import routes from '../routes';
import Layout from '../component/Layout';
import { BlockPreloader } from '../component/ui';

const ProfileModule = React.lazy(() => import('../module/Profile'));

const ProfilePage = () => {
	const pageMeta: pageMetaProps = routes.profile;

	return (
		<Layout.App meta={pageMeta}>
			<Suspense fallback={<BlockPreloader />}>
				<ProfileModule />
			</Suspense>
		</Layout.App>
	);
};

export default ProfilePage;