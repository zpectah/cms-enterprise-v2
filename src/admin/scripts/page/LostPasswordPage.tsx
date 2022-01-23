import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { pageMetaProps } from '../types/page';
import Layout from '../component/Layout';
import LostPasswordModule from '../module/LostPassword';

interface LostPasswordPageProps {}

const LostPasswordPage = ({}: LostPasswordPageProps) => {
    const params = useParams();
    const pageMeta: pageMetaProps = {
        key: 'lost-password',
        title: 'Lost password page',
        description: 'Description of page ...',
    };

    return (
        <Layout.Minimal meta={pageMeta} withOptions>
            <LostPasswordModule />
        </Layout.Minimal>
    );
};

export default LostPasswordPage;