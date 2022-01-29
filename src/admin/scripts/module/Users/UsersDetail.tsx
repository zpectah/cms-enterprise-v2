import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { UsersItemProps } from '../../types/model';

interface UsersDetailProps {
	items: UsersItemProps[];
}

const UsersDetail = (props: UsersDetailProps) => {
	const { items } = props;
	const params = useParams();

	useEffect(() => {
		console.log('params detail', params);
	}, [params]);

	return (
		<>
			<div>...UsersDetail...{JSON.stringify(items)}...</div>
		</>
	);
};

export default UsersDetail;
