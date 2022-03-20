export interface VisitorBlacklistItemModel {
	id: number | 'new';
	type: string;
	visitor_email?: string;
	visitor_ip?: string;
	cause?: string;
	description?: string;
	status: number;
	created?: string;
}
