import { modelItemBase } from './common';

export interface MenuItemsItemLangModel {
	id: number;
	label: string;
}
export interface MenuItemsItemModel extends modelItemBase {
	type: string;
	name: string;
	page_id?: number | '';
	path_url?: string;
	menu_id: number;
	parent?: number | '';
	item_order: number;
	children?: MenuItemsItemModel[];
	lang: {
		[k: string]: MenuItemsItemLangModel;
	};
}
