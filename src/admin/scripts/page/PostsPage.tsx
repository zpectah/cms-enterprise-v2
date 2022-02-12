import React, { Suspense } from 'react';

import { pageMetaProps } from '../types/page';
import routes from '../routes';
import Layout from '../component/Layout';
import { BlockPreloader } from '../component/ui';

const PostsModule = React.lazy(() => import('../module/Posts'));

interface PostsPageProps {}

const PostsPage = ({}: PostsPageProps) => {
	const pageMeta: pageMetaProps = routes.posts;

	return (
		<Layout.App meta={pageMeta}>
			<Suspense fallback={<BlockPreloader />}>
				<PostsModule />
			</Suspense>
		</Layout.App>
	);
};

export default PostsPage;
