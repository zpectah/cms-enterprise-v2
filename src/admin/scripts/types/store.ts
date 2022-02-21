import { themeListProps, toastItemProps } from './common';

export interface appStoreProps {
	sidebarOpen: boolean;
	appLanguage: string;
	appTheme: themeListProps;
	toasts: toastItemProps[];
}
