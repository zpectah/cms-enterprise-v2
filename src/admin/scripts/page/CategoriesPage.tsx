import React, { Suspense } from 'react';

import { pageMetaProps } from '../types/page';
import routes from '../routes';
import Layout from '../component/Layout';
import { BlockPreloader } from '../component/ui';

const CategoriesModule = React.lazy(() => import('../module/Categories'));

interface CategoriesPageProps {}

const CategoriesPage = ({}: CategoriesPageProps) => {
	const pageMeta: pageMetaProps = routes.categories;

	return (
		<Layout.App meta={pageMeta}>
			<Suspense fallback={<BlockPreloader />}>
				<CategoriesModule />
			</Suspense>
		</Layout.App>
	);
};

export default CategoriesPage;
