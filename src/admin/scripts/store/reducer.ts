import config from '../config';
import { storage } from '../../../../utils/helpers';
import LangService from '../service/Language.service';
import ThemeService from '../service/Theme.service';
import appStore from './store';
import {
    APP_LANGUAGE_TOGGLE,
    APP_THEME_TOGGLE,
    APP_SIDEBAR_TOGGLE,
} from './types';

function Reducer(state = appStore, action) {

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

    }

    return state;
}

export default Reducer;
