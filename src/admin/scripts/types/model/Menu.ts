import { modelItemBase } from './common';

export interface MenuItemLangModel {
	id: number;
	label: string;
}
export interface MenuItemModel extends modelItemBase {
	type: string;
	name: string;
	lang: {
		[k: string]: MenuItemLangModel;
	};
}
