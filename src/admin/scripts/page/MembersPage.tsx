import React, { Suspense } from 'react';

import { pageMetaProps } from '../types/page';
import routes from '../routes';
import Layout from '../component/Layout';
import { BlockPreloader } from '../component/ui';

const MembersModule = React.lazy(() => import('../module/Members'));

interface MembersPageProps {}

const MembersPage = ({}: MembersPageProps) => {
	const pageMeta: pageMetaProps = routes.members;

	return (
		<Layout.App meta={pageMeta}>
			<Suspense fallback={<BlockPreloader />}>
				<MembersModule />
			</Suspense>
		</Layout.App>
	);
};

export default MembersPage;
