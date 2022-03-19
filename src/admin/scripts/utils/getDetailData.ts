import { appModel } from '../types/app';
import categoriesModel from '../module/Categories/model';
import commentsModel from '../module/Comments/model';
import membersModel from '../module/Members/model';
import menuModel from '../module/Menu/model';
import menuItemsModel from '../module/MenuItems/model';
import messagesModel from '../module/Messages/model';
import pagesModel from '../module/Pages/model';
import postsModel from '../module/Posts/model';
import tagsModel from '../module/Tags/model';
import translationsModel from '../module/Translations/model';
import uploadsModel from '../module/Uploads/model';
import usersModel from '../module/Users/model';
import {
	CategoriesItemProps,
	CategoriesItemLangProps,
	CommentsItemProps,
	MembersItemProps,
	MenuItemProps,
	MenuItemLangProps,
	MenuItemsItemProps,
	MenuItemsItemLangProps,
	MessagesItemProps,
	PagesItemProps,
	PagesItemLangProps,
	PostsItemProps,
	PostsItemLangProps,
	TagsItemProps,
	TranslationsItemProps,
	TranslationsItemLangProps,
	UploadsItemProps,
	UploadsItemLangProps,
	UsersItemProps,
} from '../types/model';

type languageModelPropTypes =
	| CategoriesItemLangProps
	| MenuItemLangProps
	| PagesItemLangProps
	| PostsItemLangProps
	| TranslationsItemLangProps
	| UploadsItemLangProps
	| MenuItemsItemLangProps;

export default (
	model: appModel,
	items: any[],
	id: string | number,
	languages?: string[],
	languageModel?: Partial<languageModelPropTypes>,
) => {
	let modelData: any = {};

	if (id === 'new') {
		switch (model) {

			case 'Categories':
				modelData = categoriesModel as CategoriesItemProps;
				break;

			case 'Comments':
				modelData = commentsModel as CommentsItemProps;
				break;

			case 'Members':
				modelData = membersModel as MembersItemProps;
				break;

			case 'Menu':
				modelData = menuModel as MenuItemProps;
				break;

			case 'MenuItems':
				modelData = menuItemsModel as MenuItemsItemProps;
				break;

			case 'Messages':
				modelData = messagesModel as MessagesItemProps;
				break;

			case 'Pages':
				modelData = pagesModel as PagesItemProps;
				break;

			case 'Posts':
				modelData = postsModel as PostsItemProps;
				break;

			case 'Tags':
				modelData = tagsModel as TagsItemProps;
				break;

			case 'Translations':
				modelData = translationsModel as TranslationsItemProps;
				break;

			case 'Uploads':
				modelData = uploadsModel as UploadsItemProps;
				break;

			case 'Users':
				modelData = usersModel as UsersItemProps;
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