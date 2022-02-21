export type themeListProps = 'light' | 'dark';
export type submitMethodProps = 'create' | 'update';

export interface toastItemProps {
	id?: string;
	title: string;
	content?: string;
	context?: 'default' | 'success' | 'error';
	timeout?: number;
	onRemove?: (id: string) => void;
}
