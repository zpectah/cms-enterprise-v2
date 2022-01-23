import React from 'react';
import { Routes, Route } from 'react-router-dom';

import LostPasswordForm from './LostPasswordForm';
import CreateNewPasswordForm from './CreateNewPasswordForm';

interface LostPasswordModuleProps {}

const LostPasswordModule = (props: LostPasswordModuleProps) => {
	const {} = props;

	return (
		<>
			<Routes>
				<Route path="/" element={<LostPasswordForm />} />
				<Route path="token/:token" element={<CreateNewPasswordForm />} />
			</Routes>
		</>
	);
};

export default LostPasswordModule;