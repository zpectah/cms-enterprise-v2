import React, { Suspense } from 'react';

import { pageMetaProps } from '../types/page';
import routes from '../routes';
import Layout from '../component/Layout';
import { BlockPreloader } from '../component/ui';

const TranslationsModule = React.lazy(() => import('../module/Translations'));

interface TranslationsPageProps {}

const TranslationsPage = ({}: TranslationsPageProps) => {
	const pageMeta: pageMetaProps = routes.translations;

	return (
		<Layout.App meta={pageMeta}>
			<Suspense fallback={<BlockPreloader />}>
				<TranslationsModule />
			</Suspense>
		</Layout.App>
	);
};

export default TranslationsPage;
