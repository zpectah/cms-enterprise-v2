import React from 'react';

import { pageMetaProps } from '../types/page';
import Layout from '../component/Layout';
import DashboardModule from '../module/Dashboard';

interface DashboardPageProps {}

const DashboardPage = ({}: DashboardPageProps) => {
	const pageMeta: pageMetaProps = {
		key: 'dashboard',
		title: 'Dashboard page',
		description: 'Description of page ...',
	};

	return (
		<Layout.App meta={pageMeta}>
			<DashboardModule />
		</Layout.App>
	);
};

export default DashboardPage;
