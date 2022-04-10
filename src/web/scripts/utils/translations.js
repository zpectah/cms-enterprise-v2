import { get } from './http';

export const loadTranslations = async (lang) => {
	return await get(`/api/get_translations?parsed=true&lang=${lang}`).then((response) => {
		if (response.data) {
			return response.data;
		} else {
			console.warn('Translations was not loaded!');
			return {};
		}
	});
};

export const getTranslationFromKey = (translations, key) => {
	let label = key;
	if (translations) {
		if (translations[key]) label = translations[key];
	}

	return label;
};
