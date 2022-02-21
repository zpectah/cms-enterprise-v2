import React, { useEffect } from 'react';
import { Routes, Route, useParams } from 'react-router-dom';

import { UsersItemProps } from '../../types/model';
import { useUsers } from '../../hooks/model';
import useToasts from '../../hooks/useToasts';
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
	const params = useParams();
	const { createToast } = useToasts();

	const submitHandler = (method: 'create' | 'update', data: UsersItemProps) => {
		switch (method) {
			case 'create':
				return createUsers(data).then((resp) => {
					createToast({
						title: 'Items was created',
						context: 'success',
						timeout: 5000,
					});
					reloadUsers();

					return resp;
				});

			case 'update':
				return updateUsers(data).then((resp) => {
					createToast({
						title: 'Items was updated',
						context: 'success',
						timeout: 5000,
					});
					reloadUsers();

					return resp;
				});
		}
	};
	const deleteHandler = (ids: (string | number)[]) => {
		return deleteUsers(ids).then((resp) => {
			createToast({
				title: 'Item was deleted',
				context: 'success',
				timeout: 5000,
			});
			reloadUsers();

			return resp;
		});
	};
	const toggleHandler = (ids: (string | number)[]) => {
		return toggleUsers(ids).then((resp) => {
			createToast({
				title: 'Item was updated',
				context: 'success',
				timeout: 5000,
			});
			reloadUsers();

			return resp;
		});
	};

	useEffect(() => {
		if (users_error) createToast({
			title: users_error,
			context: 'error',
		});
	}, [ users_error ]);

	return (
		<>
			<Routes>
				<Route path="detail/:id" element={
					<UsersDetail
						key={params['*']}
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
