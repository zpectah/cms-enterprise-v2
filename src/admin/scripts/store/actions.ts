import { APP_THEME_TOGGLE, APP_SIDEBAR_TOGGLE } from './types';

export function sidebarToggle(payload) {
	return { type: APP_SIDEBAR_TOGGLE, payload };
}

export function themeToggle(payload) {
	return { type: APP_THEME_TOGGLE, payload };
}
