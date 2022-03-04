import config from '../config';

export default (lang: string) => {
	return config.locales[lang];
};
