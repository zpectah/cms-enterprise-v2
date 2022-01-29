import React from 'react';
import { Navigate } from 'react-router-dom';

export default ({ children }: { children: JSX.Element }) => {
	let auth = true; // get user state ...
	let location = ''; // current location

	console.log('Require Auth');

	if (!auth) {
		return (<Navigate to="/admin/login" state={{ from: location }} />);
	}

	return children;
};