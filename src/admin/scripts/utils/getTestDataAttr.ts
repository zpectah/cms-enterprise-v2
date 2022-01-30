import config from '../config';

export default (value: string) => {
	const attrs = {};
	if (
		config.project.admin.tests.prepare_element_id
		&& config.env !== 'production'
	) {
		attrs[config.project.admin.tests.data_attr_app] = config.project.meta.name.split(' ').join('');
		attrs[config.project.admin.tests.data_attr_id] = value;
	}

	return attrs;
};