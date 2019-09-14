import { Action } from 'redux';

import { langType } from '../lang';

import {
  CHANGE_LANGUAGE,
  ADD_USER,
  LOGOUT_USER,
  formDataActions,
  cartProductsActions
} from './actions';

import { number } from 'prop-types';

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

type FormDataStateActionsTypes = typeof formDataActions.ADD_TO_FORM_DATA | typeof formDataActions.UPDATE_ALL_FIELDS | typeof formDataActions.CLEAR_ALL_FIELDS;

interface FormDataStateAction extends Action<FormDataStateActionsTypes> {
  fieldName: string;//FIXME
  fieldValue: string;
  newState?: FormDataStateType //FIXME
};

interface CartProductItem {
  productName: string;
  price: number;
  article: number;
  quantity: number;
  selected?: boolean;
  children?: CartProductItem[];
}

export type CartProductsState = Exclude<CartProductItem[], null>;

export interface CartProductsAction extends Action<cartProductsActions> {
  article: number;
  productName: string;
  price: number;
  productArticle: number;
  additionArticle: number; 
  additionName: string;
  additionPrice: number;
};
