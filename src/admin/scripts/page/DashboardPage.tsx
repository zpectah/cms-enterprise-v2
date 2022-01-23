import React from 'react';

import { pageMetaProps } from '../types/page';
import routes from '../routes';
import Layout from '../component/Layout';
import DashboardModule from '../module/Dashboard';

interface DashboardPageProps {}

const DashboardPage = ({}: DashboardPageProps) => {
	const pageMeta: pageMetaProps = routes.dashboard;

	return (
		<Layout.App meta={pageMeta}>
			<DashboardModule />
		</Layout.App>
	);
};

export default DashboardPage;
