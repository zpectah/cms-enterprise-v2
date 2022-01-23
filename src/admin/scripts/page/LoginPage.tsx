import React from "react";

import { pageMetaProps } from '../types/page';
import Layout from '../component/Layout';
import LoginModule from '../module/Login';

interface LoginPageProps {}

const LoginPage = ({}: LoginPageProps) => {
    const pageMeta: pageMetaProps = {
        key: 'login',
        title: 'Login page',
        description: 'Description of page ...',
    };

    return (
        <Layout.Minimal meta={pageMeta} withOptions>
            <LoginModule />
        </Layout.Minimal>
    );
};

export default LoginPage;