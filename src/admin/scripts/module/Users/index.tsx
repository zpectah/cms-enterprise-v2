import React from 'react';
import { Routes, Route } from 'react-router-dom';

import UsersList from './UsersList';
import UsersDetail from './UsersDetail';

interface UsersModuleProps {}

const UsersModule = (props: UsersModuleProps) => {
	const {} = props;

	return (
		<>
			<Routes>
				<Route path="/" element={<UsersList />} />
				<Route path="detail/:id" element={<UsersDetail />} />
			</Routes>
		</>
	);
};

export default UsersModule;