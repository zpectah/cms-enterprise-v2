import React from 'react';

import { UsersItemProps } from '../../types/model';
import { useUsers } from '../../hooks/model';

interface UsersListProps {}

const UsersList = (props: UsersListProps) => {
	const {} = props;
	const {
		users,
		users_loading,
		users_error,
	} = useUsers();

	return (
		<>
			<div>...UsersList...{JSON.stringify(users)}...</div>
		</>
	);
};

export default UsersList;
