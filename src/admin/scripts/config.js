/* ! Keep JS extension because of window object types ! */

import project from '../../config/project.json';
import environmental from '../../config/environmental.json';
import options from '../../config/options.json';
import locales from '../../config/locales.json';

export default {
	env: window.APP_ENV,
	timestamp: window.APP_TIMESTAMP,
	environmental: environmental[window.APP_ENV],
	project: project,
	options: options,
	locales: locales,
	APP_TOKEN: window.APP_TOKEN,
	USER_TOKEN: window.USER_TOKEN,
};
