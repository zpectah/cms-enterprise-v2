import { modelItemBase } from './common';

export interface PagesItemLangModel {
	id: number;
	title: string;
	description?: string;
	content?: string;
}
export interface PagesItemModel extends modelItemBase {
	type: string;
	name: string;
	type_id?: number | '';
	meta_robots?: string;
	page_elements?: string[];
	lang: {
		[k: string]: PagesItemLangModel;
	};
}
