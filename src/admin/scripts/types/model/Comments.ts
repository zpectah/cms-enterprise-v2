export interface CommentsItemModel {
	id: number | string;
	type?: string;
	email?: string;
	title: string;
	content: string;
	ip_address?: string;
	assigned?: string;
	assigned_id?: number;
	parent?: number | null;
	status: number;
	created?: string;
	children?: CommentsItemModel[];
}
