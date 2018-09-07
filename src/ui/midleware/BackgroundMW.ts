import { ACTION } from '../actions/constants';
import background from '../services/Background';
export * from './setPassword';
export * from './login';
import { i18n } from '../i18n';

export const changeLang = store => next => action => {
    if (action.type === ACTION.CHANGE_LNG && action.payload !== store.currentLocale) {
        background.setCurrentLocale(action.payload);
    }
    return next(action);
};

export const updateLang = store => next => action => {
    if (action.type === ACTION.UPDATE_FROM_LNG && action.payload !== store.currentLocale) {
        i18n.changeLanguage(action.payload);
    }
    return next(action);
};


