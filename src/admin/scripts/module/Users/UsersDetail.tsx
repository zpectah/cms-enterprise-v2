import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

interface UsersDetailProps {}

const UsersDetail = (props: UsersDetailProps) => {
	const {} = props;
	const params = useParams();

	useEffect(() => {
		console.log('params', params);
	}, [params]);

	return (
		<>
			<div>...UsersDetail...</div>
		</>
	);
};

export default UsersDetail;
