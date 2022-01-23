import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import config from '../config';
import resources from './resources';
import LanguageService from '../service/Language.service';

i18n.use(initReactI18next).init({
	resources,
	defaultNS: 'common',
	lng: LanguageService.get(),
	fallbackLng: config.project.admin.language.list,
	react: {
		bindI18n: 'languageChanged',
		useSuspense: true,
	},
});

export default i18n;
