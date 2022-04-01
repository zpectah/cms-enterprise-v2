import { USER_LEVEL_NAMES } from '../constants';
import { profileProps, profileEntityActionsProps } from '../types/profile';

class EntityService {
	private readonly entity: profileProps;

	constructor(Profile: profileProps) {
		this.entity = Profile;
	}

	availableActions () {
		let entityActions = {
			profile_role: '',
			profile: {
				active: false,
				view: false,
				update: false,
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
				admin: false,
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
		if (this.entity?.id) {
			entityActions = {
				...entityActions,
				...this.entity?.entity_actions,
				profile_role: USER_LEVEL_NAMES[this.entity.item_level],
			};
		}

		return entityActions as profileEntityActionsProps;
	}

}

export default EntityService;
