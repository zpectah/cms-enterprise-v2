import React, { Suspense } from 'react';

import { pageMetaProps } from '../types/page';
import routes from '../routes';
import Layout from '../component/Layout';
import { BlockPreloader } from '../component/ui';

const MenuModule = React.lazy(() => import('../module/Menu'));

interface MenuPageProps {}

const MenuPage = ({}: MenuPageProps) => {
	const pageMeta: pageMetaProps = routes.menu;

	return (
		<Layout.App meta={pageMeta}>
			<Suspense fallback={<BlockPreloader />}>
				<MenuModule />
			</Suspense>
		</Layout.App>
	);
};

export default MenuPage;
