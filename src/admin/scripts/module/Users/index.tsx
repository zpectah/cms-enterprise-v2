import React, { useEffect } from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { UsersItemProps } from '../../types/model';
import { useUsers } from '../../hooks/model';
import useToasts from '../../hooks/useToasts';
import UsersList from './UsersList';
import UsersDetail from './UsersDetail';

const UsersModule = () => {
	const { t } = useTranslation([ 'messages' ]);
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
	const {
		createSuccessToast,
		createErrorToast,
	} = useToasts();

	const submitHandler = (method: 'create' | 'update', data: UsersItemProps) => {
		switch (method) {
			case 'create':
				return createUsers(data).then((resp) => {
					createSuccessToast({ title: t('messages:model.item_created') });
					reloadUsers();

					return resp;
				});

			case 'update':
				return updateUsers(data).then((resp) => {
					createSuccessToast({ title: t('messages:model.item_updated') });
					reloadUsers();

					return resp;
				});
		}
	};
	const deleteHandler = (ids: (string | number)[]) => {
		return deleteUsers(ids).then((resp) => {
			createSuccessToast({ title: ids.length === 1 ? t('messages:model.item_deleted') : t('messages:model.items_deleted') });
			reloadUsers();

			return resp;
		});
	};
	const toggleHandler = (ids: (string | number)[]) => {
		return toggleUsers(ids).then((resp) => {
			createSuccessToast({ title: ids.length === 1 ? t('messages:model.item_updated') : t('messages:model.items_updated') });
			reloadUsers();

			return resp;
		});
	};

	useEffect(() => {
		if (users_error) createErrorToast({ title: users_error });
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
