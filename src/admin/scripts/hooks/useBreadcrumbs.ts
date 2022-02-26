import { useLocation } from 'react-router-dom';

import config from '../config';

const useBreadcrumbs = () => {
	const location = useLocation();
	const parsedPath = location.pathname.split('/');
	const isPanel = parsedPath[4] && parsedPath[3] === 'settings';
	const isDetail = parsedPath[4] === 'detail' && parsedPath[5];

	return {
		location: location,
		cms: config.project.meta.name,
		app: parsedPath[2] && 'App',
		page: parsedPath[3],
		panel: isPanel && parsedPath[4],
		detail: isDetail && parsedPath[5],
	};
};

export default useBreadcrumbs;
