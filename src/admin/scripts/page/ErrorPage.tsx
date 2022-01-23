import React from 'react';

import { pageMetaProps } from '../types/page';
import routes from '../routes';
import Layout from '../component/Layout';

interface ErrorPageProps {
	errorCode: 404;
}

const ErrorPage = ({ errorCode }: ErrorPageProps) => {
	const pageMeta: pageMetaProps = routes.error;

	return (
		<Layout.Minimal meta={pageMeta}>
			<div>...ErrorPage...{errorCode}...</div>
		</Layout.Minimal>
	);
};

export default ErrorPage;
