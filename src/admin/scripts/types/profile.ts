import { UsersItemProps } from './model';

export interface profileProps extends UsersItemProps {}

type entityModelType = {
	view: boolean,
	update: boolean,
	delete: boolean,
	create: boolean,
}

export interface profileEntityActionsProps {
	profile: {
		active: boolean,
		view: boolean,
		update: boolean,
		level_name?: string | null,
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
		create_admin: boolean,
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
