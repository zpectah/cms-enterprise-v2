import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import { UsersItemProps } from '../../types/model';
import { useUsers } from '../../hooks/model';
import UsersList from './UsersList';
import UsersDetail from './UsersDetail';

const UsersModule = () => {
	const {
		users,
		users_loading,
		users_error,
		reloadUsers,
		createUsers,
		updateUsers,
		toggleUsers,
		deleteUsers,
	} = useUsers();

	const submitHandler = (method: 'create' | 'update', data: UsersItemProps) => {
		switch (method) {
			case 'create':
				return createUsers(data).then((resp) => {
					console.log('createUsers', method, data);
					reloadUsers();
					return resp;
				});

			case 'update':
				return updateUsers(data).then((resp) => {
					console.log('updateUsers', method, data);
					reloadUsers();
					return resp;
				});
		}
	};
	const deleteHandler = (ids: (string | number)[]) => {
		return deleteUsers(ids).then((resp) => {
			console.log('deleteUsers', ids);
			reloadUsers();
			return resp;
		});
	};
	const toggleHandler = (ids: (string | number)[]) => {
		return toggleUsers(ids).then((resp) => {
			console.log('toggleUsers', ids);
			reloadUsers();
			return resp;
		});
	};

	useEffect(() => {
		if (users_error) console.warn('Error', users_error);
	}, [ users_error ]);

	return (
		<>
			<Routes>
				<Route path="detail/:id" element={
					<UsersDetail
						dataItems={users}
						onSubmit={submitHandler}
						onDelete={deleteHandler}
						loading={users_loading}
					/>
				} />
				<Route index element={
					<UsersList
						dataItems={users}
						onToggle={toggleHandler}
						onDelete={deleteHandler}
						loading={users_loading}
					/>
				} />
			</Routes>
		</>
	);
};

export default UsersModule;
