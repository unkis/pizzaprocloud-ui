import { Action } from 'redux';

import { langType } from '../lang';

import {
  CHANGE_LANGUAGE,
  ADD_USER,
  LOGOUT_USER,
  formDataActions,
  cartProductsActions,
} from './actions';

import { SearchItem } from '../components/Cart/CartTypes';

export type LanguagesState = {
  lang: langType
}

type LanguagesActionsTypes = typeof CHANGE_LANGUAGE

export interface LanguageAction extends Action<LanguagesActionsTypes> {
  lang?: langType
}

type UserState = {
  role: string // FIXME
  code: string
}

type UserActionsTypes = typeof ADD_USER | typeof LOGOUT_USER

interface UserAction extends Action<UserActionsTypes> {
  role: string // FIXME
  code: string
}

type FormDataStateType = any // FIXME

type FormDataStateActionsTypes =
  | typeof formDataActions.ADD_TO_FORM_DATA
  | typeof formDataActions.UPDATE_ALL_FIELDS
  | typeof formDataActions.CLEAR_ALL_FIELDS

interface FormDataStateAction extends Action<FormDataStateActionsTypes> {
  fieldName: string // FIXME
  fieldValue: string
  newState?: FormDataStateType // FIXME
}

interface CartAddition extends SearchItem {
  quantity: number
}

export interface CartProduct extends Exclude<SearchItem, 'type'> {
  quantity: number
  additions?: CartAddition[]
}

export type CartProductsState = Exclude<CartProduct[], null>

export interface CartProductsAction extends Action<cartProductsActions> {
  id: number
  article: number
  productName: string
  price: number
  tax: '7' | '19'
  productId: number
  productIdx: number
  additionId: number
  productArticle: string
  additionName: string
  additionPrice: number
  additionTax: '7' | '19'
  quantity: number
}

interface ShopAddress {
  city: string;
  street: string;
  house: number;
  postIndex: number;
};

export interface SettingsState {
  shopAddress: ShopAddress;
};

export interface SettingsAction extends Action {

};
