import React, { useState } from 'react';
import { Routes, Route  } from 'react-router-dom';

import { UsersItemProps } from '../../types/model';
import UsersList from './UsersList';
import UsersDetail from './UsersDetail';

interface UsersModuleProps {}

const UsersModule = (props: UsersModuleProps) => {
	const {} = props;
	const [items, setItems] = useState<UsersItemProps[]>([
		{
			id: 1,
			active: true,
			email: '...',
			name_first: '',
			name_last: '',
			nickname: '',
		}
	]);

	console.log('Users should be downloaded here ...');

	return (
		<>
			<Routes>
				<Route path="/" element={<UsersList items={items} />} />
				<Route path="detail/:id" element={<UsersDetail items={items} />} />
			</Routes>
		</>
	);
};

export default UsersModule;
