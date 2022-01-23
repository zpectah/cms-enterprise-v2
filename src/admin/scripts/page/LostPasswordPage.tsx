import React from 'react';

import { pageMetaProps } from '../types/page';
import routes from '../routes';
import Layout from '../component/Layout';
import LostPasswordModule from '../module/LostPassword';

interface LostPasswordPageProps {}

const LostPasswordPage = ({}: LostPasswordPageProps) => {
	const pageMeta: pageMetaProps = routes.lostPassword;

	return (
		<Layout.Minimal meta={pageMeta} withOptions>
			<LostPasswordModule />
		</Layout.Minimal>
	);
};

export default LostPasswordPage;
