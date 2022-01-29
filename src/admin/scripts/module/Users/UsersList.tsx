import React from 'react';

import { UsersItemProps } from '../../types/model';

interface UsersListProps {
	items: UsersItemProps[];
}

const UsersList = (props: UsersListProps) => {
	const { items } = props;

	return (
		<>
			<div>...UsersList...{JSON.stringify(items)}...</div>
		</>
	);
};

export default UsersList;
