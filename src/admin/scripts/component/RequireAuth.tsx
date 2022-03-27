import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import useProfile from '../hooks/useProfile';
import { PagePreloader } from './ui';

export default ({ children }: { children: JSX.Element }) => {
	const {
		profile,
		profile_loading,
		profile_error,
	} = useProfile();
	const location = useLocation();

	let auth = profile?.id && !profile_loading;
	let loc = location.pathname;

	if (profile_loading && !profile_error) {
		return (
			<PagePreloader />
		);
	} else if (!auth) {
		return (
			<Navigate to="/admin/login#unauthorizedAccess" state={{ from: loc }} />
		);
	}

	return children;
};