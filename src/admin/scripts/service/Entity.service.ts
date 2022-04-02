import { USER_LEVEL_NAMES } from '../constants';
import { profileProps, profileEntityActionsProps } from '../types/profile';

class EntityService {
	private readonly entity: profileProps;

	constructor(Profile: profileProps) {
		this.entity = Profile;
	}

	availableActions () {
		const entityModelBase = {
			view: false,
			update: false,
			delete: false,
			create: false,
		};
		let entityActions: profileEntityActionsProps = {
			profile_role: 'undefined',
			profile: {
				active: false,
				view: false,
				update: false,
			},
			settings: {
				view: false,
				update: false,
				language: false,
				maintenance: false,
				blacklist: false,
			},
			Users: {
				...entityModelBase,
				admin: false,
			},
			Pages: {
				...entityModelBase
			},
			Posts: {
				...entityModelBase
			},
			Translations: {
				...entityModelBase
			},
			Categories: {
				...entityModelBase
			},
			Tags: {
				...entityModelBase
			},
			Uploads: {
				...entityModelBase
			},
			Menu: {
				...entityModelBase
			},
			MenuItems: {
				...entityModelBase
			},
			Members: {
				...entityModelBase
			},
			Messages: {
				...entityModelBase
			},
		};
		if (this.entity?.id) {
			entityActions = {
				...entityActions,
				...this.entity?.entity_actions,
				profile_role: USER_LEVEL_NAMES[this.entity.item_level],
			};
		}

		return entityActions;
	}

}

export default EntityService;
