export type themeListProps = 'light' | 'dark';
export type submitMethodProps = 'create' | 'update';

export type entityActionsType = {
	view: boolean,
	update: boolean,
	delete: boolean,
	create: boolean,
	admin?: boolean,
};
export type entityRoleType = 'redactor' | 'manager' | 'admin' | 'undefined';

export interface toastItemProps {
	id?: string;
	title: string;
	content?: string;
	context?: 'default' | 'success' | 'error';
	timeout?: number;
	onRemove?: (id: string) => void;
}
