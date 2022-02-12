import React, { Suspense } from 'react';

import { pageMetaProps } from '../types/page';
import routes from '../routes';
import Layout from '../component/Layout';
import { BlockPreloader } from '../component/ui';

const TagsModule = React.lazy(() => import('../module/Tags'));

interface TagsPageProps {}

const TagsPage = ({}: TagsPageProps) => {
	const pageMeta: pageMetaProps = routes.tags;

	return (
		<Layout.App meta={pageMeta}>
			<Suspense fallback={<BlockPreloader />}>
				<TagsModule />
			</Suspense>
		</Layout.App>
	);
};

export default TagsPage;
