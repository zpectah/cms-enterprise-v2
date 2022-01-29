import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { UsersItemProps } from '../../types/model';
import { useUsers } from '../../hooks/model';

interface UsersDetailProps {}

const UsersDetail = (props: UsersDetailProps) => {
	const {} = props;
	const params = useParams();
	const {
		users,
		users_loading,
		users_error,
	} = useUsers();

	useEffect(() => {
		console.log('params detail', params);
	}, [params]);

	return (
		<>
			<div>...UsersDetail...{JSON.stringify(users)}...</div>
		</>
	);
};

export default UsersDetail;
