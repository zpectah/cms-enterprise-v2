export interface MessagesItemModel {
	id: number;
	type: string;
	sender?: string;
	recipients?: string[];
	title: string;
	content?: string;
	created: string;
	status: number;
}
