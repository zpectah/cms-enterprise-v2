export interface MessagesItemModel {
	id: number | 'new';
	type: string;
	sender?: string;
	recipients?: string[];
	title: string;
	content?: string;
	created: string;
	status: number;
}
