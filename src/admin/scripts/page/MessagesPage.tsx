import React, { Suspense } from 'react';

import { pageMetaProps } from '../types/page';
import routes from '../routes';
import Layout from '../component/Layout';
import { BlockPreloader } from '../component/ui';

const MessagesModule = React.lazy(() => import('../module/Messages'));

interface MessagesPageProps {}

const MessagesPage = ({}: MessagesPageProps) => {
	const pageMeta: pageMetaProps = routes.messages;

	return (
		<Layout.App meta={pageMeta}>
			<Suspense fallback={<BlockPreloader />}>
				<MessagesModule />
			</Suspense>
		</Layout.App>
	);
};

export default MessagesPage;
