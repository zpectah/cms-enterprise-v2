import config from '../config';
import { TEST_DATA_ATTR_APP, TEST_DATA_ATTR_ID } from '../constants';

export default (value: string) => {
	const attrs = {};
	if (config.env !== 'production') {
		attrs[TEST_DATA_ATTR_APP] = config.project.meta.name;
		attrs[TEST_DATA_ATTR_ID] = value;
	}

	return attrs;
};