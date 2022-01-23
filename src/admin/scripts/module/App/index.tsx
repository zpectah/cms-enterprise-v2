import React from 'react';
import { Routes, Route } from 'react-router-dom';

import DashboardPage from '../../page/DashboardPage';
import UsersPage from '../../page/UsersPage';

interface AppModuleProps {}

const AppModule = ({}: AppModuleProps) => {
	console.log('AppModule loaded +');

	return (
		<>
			<Routes>
				<Route path="users/*" element={<UsersPage />} />

				<Route index element={<DashboardPage />} />
			</Routes>
		</>
	);
};

export default AppModule;
