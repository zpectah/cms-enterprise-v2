export interface MessagesItemModel {
	id: number | 'new';
	type: string;
	sender?: string;
	recipients?: string[];
	title: string;
	content?: string;
	ip_address?: string;
	status: number;
	created?: string;
}
