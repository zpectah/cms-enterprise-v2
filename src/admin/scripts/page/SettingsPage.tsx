import React, { Suspense } from 'react';

import { pageMetaProps } from '../types/page';
import routes from '../routes';
import Layout from '../component/Layout';
import { BlockPreloader } from '../component/ui';

const SettingsModule = React.lazy(() => import('../module/Settings'));

interface SettingsPageProps {}

const SettingsPage = ({}: SettingsPageProps) => {
	const pageMeta: pageMetaProps = routes.settings;

	return (
		<Layout.App meta={pageMeta}>
			<Suspense fallback={<BlockPreloader />}>
				<SettingsModule />
			</Suspense>
		</Layout.App>
	);
};

export default SettingsPage;
