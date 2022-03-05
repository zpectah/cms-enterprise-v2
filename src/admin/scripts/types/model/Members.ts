import { modelItemBase } from './common';

export interface MembersItemModel extends modelItemBase {
	type: string;
	email: string;
	phone?: string;
	name_first: string;
	name_last: string;
	nickname: string;
	password?: string;
	position?: string;
	address?: string;
	city?: string;
	country?: string;
	zip?: string;
	item_group?: string;
	img_avatar?: string;
	phone_alt?: string[];
	email_alt?: string[];
	sex?: 'male' | 'female' | 'undefined';
	birthdate?: string;
	description?: string;
	subscription?: boolean;
}
