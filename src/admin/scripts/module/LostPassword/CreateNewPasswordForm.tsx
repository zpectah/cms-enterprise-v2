import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

interface CreateNewPasswordFormProps {}

const CreateNewPasswordForm = (props: CreateNewPasswordFormProps) => {
	const {} = props;
	const params = useParams();

	useEffect(() => {
		console.log('params', params);
	}, [ params ]);

	return (
		<>
			<div>...CreateNewPasswordForm...</div>
		</>
	);
};

export default CreateNewPasswordForm;