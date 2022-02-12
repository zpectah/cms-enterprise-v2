import React, { Suspense } from 'react';

import { pageMetaProps } from '../types/page';
import routes from '../routes';
import Layout from '../component/Layout';
import { BlockPreloader } from '../component/ui';

const UploadsModule = React.lazy(() => import('../module/Uploads'));

interface UploadsPageProps {}

const UploadsPage = ({}: UploadsPageProps) => {
	const pageMeta: pageMetaProps = routes.uploads;

	return (
		<Layout.App meta={pageMeta}>
			<Suspense fallback={<BlockPreloader />}>
				<UploadsModule />
			</Suspense>
		</Layout.App>
	);
};

export default UploadsPage;
