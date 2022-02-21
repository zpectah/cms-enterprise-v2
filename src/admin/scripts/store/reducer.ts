import config from '../config';
import { storage, string } from '../../../../utils/helpers';
import LangService from '../service/Language.service';
import ThemeService from '../service/Theme.service';
import appStore from './store';
import {
	APP_LANGUAGE_TOGGLE,
	APP_THEME_TOGGLE,
	APP_SIDEBAR_TOGGLE,
	ADD_TOAST,
	REMOVE_TOAST,
} from './types';

function Reducer(state = appStore, action) {
	let toast;

	switch (action.type) {
		case APP_LANGUAGE_TOGGLE:
			LangService.set(action.payload);
			return Object.assign({}, state, {
				appLanguage: action.payload,
			});

		case APP_THEME_TOGGLE:
			ThemeService.set(action.payload);
			return Object.assign({}, state, {
				appTheme: action.payload,
			});

		case APP_SIDEBAR_TOGGLE:
			storage.set(config.project.global.keys.APP_SIDEBAR, action.payload);
			return Object.assign({}, state, {
				sidebarOpen: action.payload,
			});

		case ADD_TOAST:
			toast = {
				id: string.getToken(3, ''),
				...action.payload,
			};
			return Object.assign({}, state, {
				toasts: [toast, ...state.toasts],
			});

		case REMOVE_TOAST:
			return Object.assign({}, state, {
				toasts: state.toasts.filter((item) => {
					return item.id !== action.payload;
				}),
			});
	}

	return state;
}

export default Reducer;
