import config from '../config';
import { storage } from '../../../../utils/helpers';
import { themeListProps } from '../types/common';

class ThemeService {
	init(): void {
		storage.set(config.project.global.keys.APP_THEME, this.get());
	}

	get(): string {
		return (
			storage.get(config.project.global.keys.APP_THEME) ||
			config.project.admin.theme.default
		);
	}

	set(theme: string): void {
		storage.set(config.project.global.keys.APP_THEME, theme);
	}
}

export default new ThemeService();
