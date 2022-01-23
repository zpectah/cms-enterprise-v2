import config from '../config';
import { storage } from '../../../../utils/helpers';

class LanguageService {
	init(): void {
		storage.set(config.project.global.keys.APP_LANGUAGE, this.get());
	}

	get(): string {
		return (
			storage.get(config.project.global.keys.APP_LANGUAGE) ||
			config.project.admin.language.default
		);
	}

	set(lang: string): void {
		storage.set(config.project.global.keys.APP_LANGUAGE, lang);
	}
}

export default new LanguageService();
