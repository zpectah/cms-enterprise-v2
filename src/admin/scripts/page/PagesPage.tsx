import React, { Suspense } from 'react';

import { pageMetaProps } from '../types/page';
import routes from '../routes';
import Layout from '../component/Layout';
import { BlockPreloader } from '../component/ui';

const PagesModule = React.lazy(() => import('../module/Pages'));

interface PagesPageProps {}

const PagesPage = ({}: PagesPageProps) => {
	const pageMeta: pageMetaProps = routes.pages;

	return (
		<Layout.App meta={pageMeta}>
			<Suspense fallback={<BlockPreloader />}>
				<PagesModule />
			</Suspense>
		</Layout.App>
	);
};

export default PagesPage;
