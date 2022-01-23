import React from "react";
import { Outlet } from 'react-router-dom';

interface AppModuleProps {}

const AppModule = ({}: AppModuleProps) => {
    console.log('AppModule loaded +');

    return (
        <>
            <Outlet />
        </>
    );
};

export default AppModule;