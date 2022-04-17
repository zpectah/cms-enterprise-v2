import { modelItemBase } from './common';

export interface PostsItemLangModel {
	id: number;
	title: string;
	description?: string;
	content?: string;
}
export interface PostsItemModel extends modelItemBase {
	type: string;
	name: string;
	categories?: number[];
	tags?: number[];
	event_start?: string | null;
	event_end?: string | null;
	event_location?: [number, number];
	event_address?: string;
	event_city?: string;
	event_country?: string;
	event_zip?: string;
	attachments?: number[];
	media?: number[];
	links?: string[];
	img_main?: string;
	img_thumbnail?: string;
	published: string | null;
	author: number;
	likes?: number;
	dislikes?: number;
	template: boolean;
	lang: {
		[k: string]: PostsItemLangModel;
	};
}
