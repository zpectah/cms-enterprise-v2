import React from "react";

import { pageMetaProps } from '../types/page';
import Layout from '../component/Layout';

interface ErrorPageProps {
    errorCode: 404;
}

const ErrorPage = ({ errorCode }: ErrorPageProps) => {
    const pageMeta: pageMetaProps = {
        key: 'error',
        title: 'Error page',
        description: 'Description of page ...',
    };

    return (
        <Layout.Minimal meta={pageMeta}>
            <div>...ErrorPage...{errorCode}...</div>
        </Layout.Minimal>
    );
};

export default ErrorPage;