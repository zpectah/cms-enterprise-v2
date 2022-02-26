import { appModel } from '../types/app';
import categoriesModel from '../module/Categories/model';
import commentsModel from '../module/Comments/model';
import membersModel from '../module/Members/model';
import menuModel from '../module/Menu/model';
import messagesModel from '../module/Messages/model';
import pagesModel from '../module/Pages/model';
import postsModel from '../module/Posts/model';
import tagsModel from '../module/Tags/model';
import translationsModel from '../module/Translations/model';
import uploadsModel from '../module/Uploads/model';
import usersModel from '../module/Users/model';

export default (
	model: appModel,
	items: any[],
	id: string | number,
	languages?: string[],
	languageModel?: any,
) => {
	let modelData: any = {};

	if (id === 'new') {
		switch (model) {

			case 'Categories':
				modelData = categoriesModel;
				break;

			case 'Comments':
				modelData = commentsModel;
				break;

			case 'Members':
				modelData = membersModel;
				break;

			case 'Menu':
				modelData = menuModel;
				break;

			case 'Messages':
				modelData = messagesModel;
				break;

			case 'Pages':
				modelData = pagesModel;
				break;

			case 'Posts':
				modelData = postsModel;
				break;

			case 'Tags':
				modelData = tagsModel;
				break;

			case 'Translations':
				modelData = translationsModel;
				break;

			case 'Uploads':
				modelData = uploadsModel;
				break;

			case 'Users':
				modelData = usersModel;
				break;

		}

		if (languages && languageModel) {
			modelData['lang'] = {};
			languages.map((lng) => {
				modelData['lang'][lng] = languageModel;
			});
		}

	} else {
		modelData = items.find((item) => item.id == id);
	}

	return modelData;
};