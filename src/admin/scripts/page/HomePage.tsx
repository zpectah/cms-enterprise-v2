import React from 'react';

import { pageMetaProps } from '../types/page';
import Layout from '../component/Layout';

interface HomePageProps {}

const HomePage = (props: HomePageProps) => {
	const {} = props;
	const pageMeta: pageMetaProps = {
		key: 'Home',
		title: 'Home page',
		description: 'Description of page ...',
	};

	return (
		<Layout.Minimal meta={pageMeta} withOptions>
			<div>...HomePage...(maybe redirect to login or whatever)</div>
		</Layout.Minimal>
	);
};

export default HomePage;
