import { modelItemBase } from './common';

export interface UsersItemModel extends modelItemBase {
	type: string;
	email: string;
	name_first: string;
	name_last: string;
	nickname: string;
	password?: string;
	item_group: string;
	description: string;
	img_avatar: string;
	item_level: number;
}