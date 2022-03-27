import config from '../config';
import { USER_LEVEL_NAMES } from '../constants';
import { profileProps, profileEntityActionsProps } from '../types/profile';

class EntityService {
	private readonly entity: profileProps;

	constructor(Profile: profileProps) {
		this.entity = Profile;
	}

	availableActions () {
		let entityActions = {
			profile: {
				active: false,
				view: false,
				update: false,
				level_name: null,
			},
			settings: {
				view: false,
				update: false,
				maintenance: false,
				blacklist: false,
			},
			Users: {
				view: false,
				update: false,
				delete: false,
				create: false,
				create_admin: false,
			},
			Pages: {
				view: false,
				update: false,
				delete: false,
				create: false,
			},
			Posts: {
				view: false,
				update: false,
				delete: false,
				create: false,
			},
			Translations: {
				view: false,
				update: false,
				delete: false,
				create: false,
			},
			Categories: {
				view: false,
				update: false,
				delete: false,
				create: false,
			},
			Tags: {
				view: false,
				update: false,
				delete: false,
				create: false,
			},
			Uploads: {
				view: false,
				update: false,
				delete: false,
				create: false,
			},
			Menu: {
				view: false,
				update: false,
				delete: false,
				create: false,
			},
			MenuItems: {
				view: false,
				update: false,
				delete: false,
				create: false,
			},
			Members: {
				view: false,
				update: false,
				delete: false,
				create: false,
			},
			Messages: {
				view: false,
				update: false,
				delete: false,
				create: false,
			},
		};

		if (this.entity?.id && this.entity?.item_level) {
			switch (this.entity?.item_level) {

				case 3: // Redactor
					entityActions = {
						...entityActions,
						profile: {
							active: true,
							view: true,
							update: true,
							level_name: USER_LEVEL_NAMES[this.entity.item_level],
						},
						Posts: {
							view: true,
							update: true,
							delete: true,
							create: true,
						},
						Translations: {
							view: true,
							update: true,
							delete: true,
							create: true,
						},
						Categories: {
							view: true,
							update: true,
							delete: true,
							create: true,
						},
						Uploads: {
							view: true,
							update: true,
							delete: true,
							create: true,
						},
						Tags: {
							view: true,
							update: true,
							delete: true,
							create: true,
						}
					}
					break;

				case 5: // Manager
					entityActions = {
						...entityActions,
						profile: {
							active: true,
							view: true,
							update: true,
							level_name: USER_LEVEL_NAMES[this.entity.item_level],
						},
						Posts: {
							view: true,
							update: true,
							delete: true,
							create: true,
						},
						Translations: {
							view: true,
							update: true,
							delete: true,
							create: true,
						},
						Categories: {
							view: true,
							update: true,
							delete: true,
							create: true,
						},
						Uploads: {
							view: true,
							update: true,
							delete: true,
							create: true,
						},
						Tags: {
							view: true,
							update: true,
							delete: true,
							create: true,
						},
						settings: {
							view: true,
							update: true,
							maintenance: false,
							blacklist: false,
						},
						Users: {
							view: true,
							update: true,
							delete: true,
							create: true,
							create_admin: false,
						},
						Pages: {
							view: true,
							update: true,
							delete: true,
							create: true,
						},
						Menu: {
							view: true,
							update: true,
							delete: true,
							create: true,
						},
						MenuItems: {
							view: true,
							update: true,
							delete: true,
							create: true,
						},
						Members: {
							view: true,
							update: true,
							delete: true,
							create: true,
						},
						Messages: {
							view: true,
							update: true,
							delete: true,
							create: true,
						},
					}
					break;

				case 7: // Admin
					entityActions = {
						profile: {
							active: true,
							view: true,
							update: true,
							level_name: USER_LEVEL_NAMES[this.entity.item_level],
						},
						settings: {
							view: true,
							update: true,
							maintenance: true,
							blacklist: true,
						},
						Users: {
							view: true,
							update: true,
							delete: true,
							create: true,
							create_admin: true,
						},
						Pages: {
							view: true,
							update: true,
							delete: true,
							create: true,
						},
						Posts: {
							view: true,
							update: true,
							delete: true,
							create: true,
						},
						Translations: {
							view: true,
							update: true,
							delete: true,
							create: true,
						},
						Categories: {
							view: true,
							update: true,
							delete: true,
							create: true,
						},
						Tags: {
							view: true,
							update: true,
							delete: true,
							create: true,
						},
						Uploads: {
							view: true,
							update: true,
							delete: true,
							create: true,
						},
						Menu: {
							view: true,
							update: true,
							delete: true,
							create: true,
						},
						MenuItems: {
							view: true,
							update: true,
							delete: true,
							create: true,
						},
						Members: {
							view: true,
							update: true,
							delete: true,
							create: true,
						},
						Messages: {
							view: true,
							update: true,
							delete: true,
							create: true,
						},
					}
					break;

			}
		}

		return entityActions as profileEntityActionsProps;
	}

}

export default EntityService;
