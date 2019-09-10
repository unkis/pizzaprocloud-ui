import { langType } from "../lang";
import { CHANGE_LANGUAGE, ADD_USER, LOGOUT_USER } from './actions';

export type changeLanguageType = (lang: langType) => ({ type: typeof CHANGE_LANGUAGE, lang: langType });

export type addUserType = (role: string/*FIXME*/, code: string) => { type: typeof ADD_USER, role: string/*FIXME */ };

export type logoutUserType = () => { type: typeof LOGOUT_USER};
