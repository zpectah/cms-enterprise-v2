import { appModel } from '../types/app';
import usersModel from '../module/Users/model';

export default (
	model: appModel,
	items: any[],
	id: string | number
) => {
	if (id == 'new') {
		switch (model) {

			case 'Users':
				return usersModel;

		}

		// TODO: create language model

	} else {
		return items.find((item) => item.id == id);
	}
};