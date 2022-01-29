import { modelItemBase } from './common';

export interface UsersItemModel extends modelItemBase {
	email: string;
	name_first: string;
	name_last: string;
	nickname: string;
	password?: string;
}