export interface CmsRequestsItemModel {
	id: number | 'new';
	type: string;
	context: string;
	value: string;
	token: string;
	ip_address?: string;
	status: number;
	created?: string;
}