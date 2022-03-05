import { modelItemBase } from './common';

export interface UploadsItemLangModel {
	id: number;
	label?: string;
	description?: string;
}
export interface UploadsItemModel extends modelItemBase {
	type: string;
	name: string;
	fileBase64?: Blob;
	fileBase64_cropped?: Blob;
	file_name: string;
	file_extension: string;
	file_mime: string;
	file_size: number;
	lang: {
		[k: string]: UploadsItemLangModel;
	};
}
