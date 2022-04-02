import { UsersItemProps } from './model';
import { entityActionsType, entityRoleType } from './common';

export interface profileEntityActionsProps {
	profile_role: entityRoleType,
	profile: {
		active: boolean,
		view: boolean,
		update: boolean,
	},
	settings: {
		view: boolean,
		update: boolean,
		language: boolean,
		maintenance: boolean,
		blacklist: boolean,
	},
	Users: entityActionsType,
	Pages: entityActionsType,
	Posts: entityActionsType,
	Translations: entityActionsType,
	Categories: entityActionsType,
	Tags: entityActionsType,
	Uploads: entityActionsType,
	Menu: entityActionsType,
	MenuItems: entityActionsType,
	Members: entityActionsType,
	Messages: entityActionsType,
}

export interface profileProps extends UsersItemProps {
	entity_actions: profileEntityActionsProps;
}
