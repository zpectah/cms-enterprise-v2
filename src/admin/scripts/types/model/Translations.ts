import { modelItemBase } from './common';

export interface TranslationsItemLangModel {
	id: number;
	value: string;
}
export interface TranslationsItemModel extends modelItemBase {
	type: string;
	name: string;
	lang: {
		[k: string]: TranslationsItemLangModel;
	};
}
