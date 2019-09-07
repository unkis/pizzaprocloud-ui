import { Action } from 'redux';

import { langType } from '../lang';

import {
  CHANGE_LANGUAGE,
  ADD_USER,
  LOGOUT_USER,
  ADD_TO_FORM_DATA,
  UPDATE_ALL_FIELDS,
  CLEAR_ALL_FIELDS
} from './actions';

export type LanguagesState = {
  lang: langType;
};

type LanguagesActionsTypes = typeof CHANGE_LANGUAGE;

export interface LanguageAction extends Action<LanguagesActionsTypes> {
  lang: langType;
};

type UserState = {
  role: string;//FIXME
  code: string;
};

type UserActionsTypes = typeof ADD_USER | typeof LOGOUT_USER;

interface UserAction extends Action<UserActionsTypes> {
  role: string;//FIXME
  code: string;
};

type FormDataStateType = any;//FIXME

type FormDataStateActionsTypes = typeof ADD_TO_FORM_DATA | typeof UPDATE_ALL_FIELDS | typeof CLEAR_ALL_FIELDS;

interface FormDataStateAction extends Action<FormDataStateActionsTypes> {
  fieldName: string;//FIXME
  fieldValue: string;
  newState?: FormDataStateType //FIXME
};
