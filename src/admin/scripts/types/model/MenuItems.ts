import { modelItemBase } from './common';

export interface MenuItemsItemLangModel {
	id: number;
	label: string;
}
export interface MenuItemsItemModel extends modelItemBase {
	type: string;
	name: string;
	page_id?: number | null;
	path_url?: string;
	menu_id: number;
	parent: number;
	item_order: number;
	lang: {
		[k: string]: MenuItemsItemLangModel;
	};
}
