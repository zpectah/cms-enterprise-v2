import { UsersItemProps } from './model';

export interface profileProps extends UsersItemProps {
	entity_actions: profileEntityActionsProps;
}

type entityModelType = {
	view: boolean,
	update: boolean,
	delete: boolean,
	create: boolean,
}

export interface profileEntityActionsProps {
	profile_role: string | null,
	profile: {
		active: boolean,
		view: boolean,
		update: boolean,
	},
	settings: {
		view: boolean,
		update: boolean,
		maintenance: boolean,
		blacklist: boolean,
	},
	Users: {
		view: boolean,
		update: boolean,
		delete: boolean,
		create: boolean,
		admin: boolean,
	},
	Pages: entityModelType,
	Posts: entityModelType,
	Translations: entityModelType,
	Categories: entityModelType,
	Tags: entityModelType,
	Uploads: entityModelType,
	Menu: entityModelType,
	MenuItems: entityModelType,
	Members: entityModelType,
	Messages: entityModelType,
}
