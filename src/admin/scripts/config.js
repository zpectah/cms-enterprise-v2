/* ! Keep JS extension because of window object types ! */

import project from '../../config/project.json';
import environmental from '../../config/environmental.json';
import options from '../../config/options.json';
import locales from '../../config/locales.json';
import cfg_static from '../../config/static.json';

export default {
	env: window.APP_ENV,
	timestamp: window.APP_TIMESTAMP,
	environmental: environmental[window.APP_ENV],
	project: project,
	options: options,
	locales: locales,
	static: cfg_static,
};
