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
	id: string | number
) => {
	if (id == 'new') {
		switch (model) {

			case 'Categories':
				return categoriesModel;

			case 'Comments':
				return commentsModel;

			case 'Members':
				return membersModel;

			case 'Menu':
				return menuModel;

			case 'Messages':
				return messagesModel;

			case 'Pages':
				return pagesModel;

			case 'Posts':
				return postsModel;

			case 'Tags':
				return tagsModel;

			case 'Translations':
				return translationsModel;

			case 'Uploads':
				return uploadsModel;

			case 'Users':
				return usersModel;

		}
	} else {
		return items.find((item) => item.id == id);
	}
};