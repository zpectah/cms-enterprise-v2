import { modelItemBase } from './common';

export interface CategoriesItemLangModel {
	id: number;
	title: string;
	description?: string;
}
export interface CategoriesItemModel extends modelItemBase {
	type: string;
	name: string;
	parent?: string;
	img_main?: string;
	img_thumbnail?: string;
	lang: {
		[k: string]: CategoriesItemLangModel;
	};
}
