import config from '../config';
import { storage } from '../../../../utils/helpers';
import { appStoreProps } from '../types/store';
import { themeListProps } from '../types/common';
import LanguageService from '../service/Language.service';
import ThemeService from '../service/Theme.service';

const appStore: appStoreProps = {
	sidebarOpen: storage.get(config.project.global.keys.APP_SIDEBAR) == 'true',
	appLanguage: LanguageService.get(),
	appTheme: ThemeService.get() as themeListProps,
	toasts: [],
};

export default appStore;
