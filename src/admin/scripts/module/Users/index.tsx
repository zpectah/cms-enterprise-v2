import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import { UsersItemProps } from '../../types/model';
import { useUsers } from '../../hooks/model';
import UsersList from './UsersList';
import UsersDetail from './UsersDetail';

interface UsersModuleProps {}

const UsersModule = (props: UsersModuleProps) => {
	const {} = props;

	const {
		users,
		users_loading,
		users_error,
	} = useUsers();

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
